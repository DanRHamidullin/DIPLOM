from django.contrib import admin
from .models import *

# Здесь регистрируем свои модели.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
