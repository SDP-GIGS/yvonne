from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import InternshipPlacement
from .serializers import InternshipPlacementSerializer


class InternshipPlacementViewSet(viewsets.ModelViewSet):
    queryset = InternshipPlacement.objects.all()
    serializer_class = InternshipPlacementSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        user = self.request.user
        if user.role == 'STUDENT':
            # Only return the placement that belongs to this student
            return InternshipPlacement.objects.filter(student=user)
        if user.role in ('WORK_SUPERVISOR', 'ACADEMIC_SUPERVISOR'):
            # Supervisors see their assigned interns' placements
            return InternshipPlacement.objects.filter(
                workplace_supervisor=user
            ) | InternshipPlacement.objects.filter(
                academic_supervisor=user
            )
        # Admins see everything
        return InternshipPlacement.objects.all()