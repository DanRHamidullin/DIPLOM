from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review, Invoice, Zadanie2


#Сериализаторы позволяют преобразовывать сложные данные , такие как
# наборы запросов и экземпляры моделей, в собственные типы данных Python,
# которые затем можно легко преобразовать в JSON XML другие типы контента.
# Сериализаторы также обеспечивают десериализацию, позволяя преобразовывать
# проанализированные данные обратно в сложные типы после первой проверки входящих данных.

#Этот класс сериализует юзера, он иметт определенные поля и дальше можно
# использовать для генерации токена.
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    # Функция возвращает токен для определенного юзера
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

#Задание 4
#ModelSerializer Класс предоставляет способ, который позволяет автоматически создавать Serializer класс с полями, соответствующими полям модели.
class InvoiceSerializer(serializers.ModelSerializer):

#ModelSerializer автоматически сгенерирует набор полей на основе модели.
#ModelSerializer автоматически создаст валидаторы для сериализатора, такие как валидаторы unique_together.
#ModelSerializer включает в себя простые реализации по умолчанию .create() и .update().

#По умолчанию все поля модели в классе будут сопоставлены с соответствующими полями сериализатора.
    class Meta:
        model = Invoice
        fields = '__all__'
        # fields = ['_id', 'type', 'sum'] либо все поля, либо выборочные

    #также можно добавить другие геттеры

class Zadanie2Serializer(serializers.ModelSerializer):

    class Meta:
        model = Zadanie2
        fields = '__all__'

