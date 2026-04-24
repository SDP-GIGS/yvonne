from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer # You'll need to create this serializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTOkenObtainPairSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):

        #if the user isnt logged in return nothing
        user=self.request.user
        if not user.is_authenticated:
            return CustomUser.objects.none()
        
        # RBAC: Only Admins see everyone. Others see only themselves.
        #if self.request.user.role == 'ADMIN':
        #lets try something so that by mistake the user role is not in the system does not crash
        if getattr(user,'role',None)=='ADMIN':
            return CustomUser.objects.all() 
        return CustomUser.objects.filter(id=self.request.user.id)

    def get_permissions(self):
         # Business Logic: Anyone can register, but only Admin can delete users.
        if self.action == 'create':
            return [AllowAny()]
        if self.action == 'destroy':
            return [permissions.IsAdminUser()]
        return [IsAuthenticated()]
    
#now also instead of deleting a record it can be activate so to keep the history of such a record
    @action(detail=True, methods=["post"],permission_classes=[permissions.IsAdminUser])
    def deactivate(self ,request,pk=None):
        user=self.get_object()
         
        if not user.is_active:
            return Response({"message":f"User{user.name} has been deactivated."}), status.HTTP_200_OK
        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTOkenObtainPairSerializer   
         

         
# Create your views here.
