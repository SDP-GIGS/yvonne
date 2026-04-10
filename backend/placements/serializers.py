from rest_framework import serializers
from .models import InternshipPlacement # Assuming this is your model name

class InternshipPlacementSerializer(serializers.ModelSerializer):
    # Using 'StringRelatedField' shows the names instead of just ID numbers
    student = serializers.StringRelatedField(read_only=True)
    academic_supervisor = serializers.StringRelatedField(read_only=True)
    workplace_supervisor = serializers.StringRelatedField(read_only=True)
    

    class Meta:
        model = InternshipPlacement
        fields = '__all__'