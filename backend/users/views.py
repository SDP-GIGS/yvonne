from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer # You'll need to create this serializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        # Business Logic: Anyone can register (POST), 
        # but only Admins can see the full list of users (GET).
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

# Create your views here.
