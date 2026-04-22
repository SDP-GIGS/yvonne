from rest_framework import serializers
from django.contrib.auth import get_user_model

User=get_user_model()


class UserSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    #password is write_only so it is never sent back to the user
    password=serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = get_user_model
        fields = ['id', 'username',  'first_name', 'last_name', 'role','email' ,'password','role_display']

    def create(self, validate_data):
        #we use create_user to ensure the password is hashed 
        #turning the password into unreadable string for safety
        user=User.objects.create_user(
            username=validate_data['username'],
            email=validate_data['email'],
            password=validate_data['password'],
            role=validate_data['role']
        )
        return user