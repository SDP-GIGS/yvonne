from django import serializers
from.models import students, academic_supervisor,workplace_supervisor,administrator,WeeklyLog

class students_serializer(serializers.ModelSerlializer):
    class Meta:
        model=students
        fields='__all__'


class academic_supervisor(serializers.ModelSerializer):
    class Meta:
        model=academic_supervisor
        fields='__all__'

class workplace_supervisor(serializers.ModelSerializer):
    class Meta:
        model= workplace_supervisor
        fields='__all__'
