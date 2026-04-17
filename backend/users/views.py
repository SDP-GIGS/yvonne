from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer # You'll need to create this serializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        # RBAC: Only Admins see everyone. Others see only themselves.
        if self.request.user.role == 'ADMIN':
            return CustomUser.objects.all()
        return CustomUser.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        # Business Logic: Anyone can register, but only Admin can delete users.
        if self.action == 'create':
            return [permissions.AllowAny()]
        if self.action == 'destroy':
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

# Create your views here.
