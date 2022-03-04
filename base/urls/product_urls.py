from django.urls import path
from base.views import product_views as views

#Пользователь делает запрос, и Django сначала заходит в urls.py, а потом уже сюда.
#Django проходит по каждому шаблону URL по порядку и останавливается на первом,
# который соответствует запрошенному URL, сопоставляя его с path_info.
urlpatterns = [

    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name="product"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]
