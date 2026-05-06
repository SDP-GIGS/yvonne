from rest_framework import serializers
from .models import WeeklyLog
from datetime import date

class WeeklyLogSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.get_full_name')


    class Meta:
        model = WeeklyLog
        fields = '__all__'
        read_only_fields = ['student',]

    def validate_end_date(self, value):
        from datetime import timedelta
        if value > date.today() + timedelta(days=7):
            raise serializers.ValidationError("You cannot submit a log for a week that hasn't ended yet.")
        return value