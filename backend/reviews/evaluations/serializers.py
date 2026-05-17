from rest_framework import serializers
from .models import AcademicEvaluation

class EvaluationSerializer(serializers.ModelSerializer):
    # This captures the property we defined in the model
    final_score = serializers.ReadOnlyField(source='final_weighted_score')
    

    class Meta:
        model = AcademicEvaluation
        fields = ['id', 'placement', 'organization_score', 'logbook_score', 'final_report_score', 'final_score', 'comments']

        