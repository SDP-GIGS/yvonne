from rest_framework import serializers
from .models import InternshipPlacement # Assuming this is your model name

class InternshipPlacementSerializer(serializers.ModelSerializer):
    # Using 'StringRelatedField' shows the names instead of just ID numbers
    student_email= serializers.StringRelatedField(source='student.email')
    academic_supervisor = serializers.ReadOnlyField(source='academic_supervisor.email')
    workplace_supervisor_email = serializers.StringRelatedField(source='workplace_supervisor.email')
    
    
    class Meta:
        model = InternshipPlacement
        fields = '__all__'
        