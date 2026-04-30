from rest_framework import serializers
from .models import CustomUser, SupervisorApplication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    #password is write_only so it is never sent back to the user
    password = serializers.CharField(write_only=True, min_length=8)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'password', 'role_display', 'tokens']
    
    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def create(self, validated_data):
        # we use create_user to ensure the password is hashed 
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(
            password=password,
            **validated_data
        )
        
        # If user is a supervisor, set them to inactive pending approval and create an application
        if user.role in [CustomUser.WORK_SUPERVISOR, CustomUser.ACADEMIC_SUPERVISOR]:
            user.is_active = False
            user.save()
            SupervisorApplication.objects.create(user=user)
            
        return user

class MyTOkenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data["email"] = self.user.email
        data["role"] = self.user.role
        return data

class SupervisorApplicationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    user_role = serializers.CharField(source='user.get_role_display', read_only=True)

    class Meta:
        model = SupervisorApplication
        fields = ['id', 'user', 'user_email', 'user_first_name', 'user_last_name', 'user_role', 'status', 'created_at', 'updated_at']
        read_only_fields = ['user', 'status']