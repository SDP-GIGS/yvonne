from django import serializers
from.models import students, academic_supervisor,workplace_supervisor,administrator,WeeklyLog

class students_serializer(serializers.ModelSerlializer):
    class Meta:
        model=students
        fields='__all__'


