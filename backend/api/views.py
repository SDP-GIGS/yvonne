from django.shortcuts import render
from rest_framework import generics
from .models import Students
from .serializers import StudentsSerializer

class StudentListCreate(generics.ListCreateAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer

# Create your views here.
