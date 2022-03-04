from django.urls import path
from base.views import user_views as views

#Пользователь делает запрос, и Django сначала заходит в urls.py, а потом уже сюда.
#Django проходит по каждому шаблону URL по порядку и останавливается на первом,
# который соответствует запрошенному URL, сопоставляя его с path_info.

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('getInvoices/', views.getInvoices, name='invoices'),
    path('createInvoice/',  views.createInvoice, name='create-invoice'),

    #Задание 2
    path('postUserZadanie2/', views.postUserZadanie2, name='zadanie2'),
    path('postUserZadanie2get/', views.postUserZadanie2get, name='postUserZadanie2get'),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]
