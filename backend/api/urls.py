from django.urls import path
from .views import YourModelListCreate

urlpatterns = [
    path('api/items/', YourModelListCreate.as_view(), name='item-list-create'),
]
