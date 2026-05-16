from rest_framework import serializers
from .models import WeeklyLog
from datetime import date

class WeeklyLogSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.get_full_name')
    student_email = serializers.ReadOnlyField(source='student.email')
    

    class Meta:
        model = WeeklyLog
        fields = [
            "id",
            "student",
            "student_name",
            "student_email",
            "week_number",
            "start_date",
            "end_date",
            "activities_performed",
            "lessons_learned",
            "challenges_faced",
            "Academic_supervisor",
            "placement_supervisor",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["student"]

        