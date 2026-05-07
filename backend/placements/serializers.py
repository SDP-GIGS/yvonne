from rest_framework import serializers
from .models import InternshipPlacement

class InternshipPlacementSerializer(serializers.ModelSerializer):

    student_email = serializers.ReadOnlyField(source='student.email')

    academic_supervisor_email = serializers.ReadOnlyField(
        source='academic_supervisor.email'
    )

    workplace_supervisor_email = serializers.ReadOnlyField(
        source='workplace_supervisor.email'
    )

    class Meta:
        model = InternshipPlacement
        fields = '__all__'