from django.urls import path
from .views import studentListCreate

urlpatterns = [
    path('api/students/', studentListCreate.as_view(), name='student-list-create'),
]
