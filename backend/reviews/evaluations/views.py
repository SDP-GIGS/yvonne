from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import AcademicEvaluation
from .serializers import EvaluationSerializer

class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = AcademicEvaluation.objects.all()
    serializer_class = EvaluationSerializer

    def get_permissions(self):
        # RBAC: Only allow Academic Supervisors to create or edit scores
        if self.action in ['create', 'update', 'partial_update']:
            return [permissions.IsAuthenticated()] # You can refine this with a custom role check
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        # Automatically assign the logged-in supervisor to the record
        serializer.save(supervisor=self.request.user)

# Create your views here.
