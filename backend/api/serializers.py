from rest_framework import serializers
from .models import (
    students,
    academic_supervisor,
    workplace_supervisor,
    administrator,
    company,
    internship,
    appplication_model,
    internshipreport_model,
    WeeklyLog
)

class studentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = '__all__' 

class AcademicSupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = academic_supervisor
        fields = '__all__'

class WorkplaceSupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = workplace_supervisor
        fields = '__all__'

class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = administrator
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = company
        fields = '__all__'

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = internship
        fields = '__all__'

class ApplicationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = appplication_model
        fields = '__all__'

class InternshipReportModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = internshipreport_model
        fields = '__all__'

class WeeklyLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyLog
        fields = '__all__'