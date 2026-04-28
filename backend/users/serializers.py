from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    #password is write_only so it is never sent back to the user
    password=serializers.CharField(write_only=True, min_length=8)
    tokens=serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username',  'first_name', 'last_name', 'role','email' ,'password','role_display']
    
    def get_token(self, user):
        refresh=RefreshToken.for_user(user)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_Token)
        }

    def create(self, validate_data):
        #we use create_user to ensure the password is hashed 
        #turning the password into unreadable string for safety
        user=CustomUser.objects.create_user(
            username=validate_data['username'],
             password=validate_data['password'],
            
        )
        return user
class MyTOkenObtainPairSerializer(TokenObtainPairSerializer) :
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        token['username']=user.username
        token['role']=user.role
        return token
    
    def validate(self, attrs):
        data=super().validate(attrs)
        data["username"]=self.user.username
        data["role"]=self.user.role
        return data