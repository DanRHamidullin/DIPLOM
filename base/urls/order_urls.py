from django.urls import path
from base.views import order_views as views

#Это файл является частью Диспетчера URL.
#Пользователь делает запрос, и Django сначала заходит в urls.py, а потом уже сюда.
#Django проходит по каждому шаблону URL по порядку и останавливается на первом,
# который соответствует запрошенному URL, сопоставляя его с path_info.

urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
