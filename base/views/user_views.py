from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, InvoiceSerializer, \
    Zadanie2Serializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

# Если вы хотите настроить утверждения, содержащиеся в веб-токенах,
# которые генерируются представлениями TokenObtainPairView и TokenObtainSlidingView,
# создайте подкласс для желаемого представления, а также подкласс для его
# соответствующего сериализатора.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        #UserSerializerWithToken - в этот класс отправляем нашего
        # юзера и получаем по нему сериализованню сущность,
        # у которой есть определенные данные (id, username, token и тд)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

#Это настройска удтверждений по токену JWT.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


@api_view(['POST'])
def createInvoice(request):
    data = request.data

    # try:
    from base.models import Invoice
    invoice = Invoice.objects.create(
        _id=data['_id'],
        type=data['type'],
        sum=data['sum'],
        job_id=data['job_id']
    )

    serializer = InvoiceSerializer(invoice, many=False)
    return Response(serializer.data)
    # except:
    #     message = {'error'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def getInvoices(request):
    from base.models import Invoice
    invoices = Invoice.objects.all()
    serializer = InvoiceSerializer(invoices, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def postUserZadanie2get(request):
    from base.models import Zadanie2
    Zadanie2 = Zadanie2.objects.all()
    serializer = Zadanie2Serializer(Zadanie2, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postUserZadanie2(request):
    data = request.data

    from base.models import Zadanie2
    zadanie2 = Zadanie2.objects.create(
        user_name=data['user_name'],
        user_phone=data['user_phone'],
        user_date=data['user_date'],
        user_email=data['user_email']
    )

    serializer = Zadanie2Serializer(zadanie2, many=False)
    return Response(serializer.data)