from django.shortcuts import render
from rest_framework import generics
from .models import students
from .serializers import studentsSerializer

class studentListCreate(generics.ListCreateAPIView):
    queryset = students.objects.all()
    serializer_class = studentsSerializer

# Create your views here.
