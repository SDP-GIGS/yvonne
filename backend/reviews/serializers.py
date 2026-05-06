from rest_framework import serializers
from .models import SupervisorReview



class SupervisorReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorReview
        fields = ['id', 'weekly_log', 'supervisor', 'comments', 'technical_score', 'professionalism_score', 'date_reviewed']
        read_only_fields = ['supervisor', 'date_reviewed']
        