from rest_framework import serializers
from .models import InternshipPlacement


class InternshipPlacementSerializer(serializers.ModelSerializer):

    student_email = serializers.ReadOnlyField(source='student.email')
    student_name = serializers.SerializerMethodField()

    # FULL NESTED SUPERVISOR DATA (THIS IS THE FIX)
    workplace_supervisor_details = serializers.SerializerMethodField()
    academic_supervisor_details = serializers.SerializerMethodField()

    academic_supervisor_email = serializers.ReadOnlyField(
        source='academic_supervisor.email'
    )

    workplace_supervisor_email = serializers.ReadOnlyField(
        source='workplace_supervisor.email'
    )

    class Meta:
        model = InternshipPlacement
        fields = '__all__'

    def get_student_name(self, obj):
        return obj.student.get_full_name()

    def get_workplace_supervisor_details(self, obj):
        if not obj.workplace_supervisor:
            return None
        return {
            "id": obj.workplace_supervisor.id,
            "first_name": obj.workplace_supervisor.first_name,
            "last_name": obj.workplace_supervisor.last_name,
            "email": obj.workplace_supervisor.email,
        }

    def get_academic_supervisor_details(self, obj):
        if not obj.academic_supervisor:
            return None
        return {
            "id": obj.academic_supervisor.id,
            "first_name": obj.academic_supervisor.first_name,
            "last_name": obj.academic_supervisor.last_name,
            "email": obj.academic_supervisor.email,
        }