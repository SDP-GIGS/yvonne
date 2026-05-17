from django.shortcuts import render
from rest_framework import viewsets ,status
from rest_framework.permissions import IsAuthenticated
from .models import WeeklyLog
from .serializers import WeeklyLogSerializer
from rest_framework.exceptions import ValidationError
from rest_framework .response import Response
from rest_framework.decorators import action



class WeeklyLogViewSet(viewsets.ModelViewSet):
    serializer_class = WeeklyLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        

        # RBAC: Students see their own logs; Supervisors see their assigned interns
        if user.role == 'STUDENT':
            return WeeklyLog.objects.filter(student=user)

        if user.role == 'WORK_SUPERVISOR':
            return WeeklyLog.objects.filter(
                student__placement__workplace_supervisor=user
            )
        if user.role == 'ADMIN':
            return WeeklyLog.objects.all()

        if user.role == 'ACADEMIC_SUPERVISOR':
            return WeeklyLog.objects.filter(
                student__placement__academic_supervisor=user
            )

        return WeeklyLog.objects.none()

    def perform_create(self, serializer):
        student = self.request.user

        try:
            placement = student.placement
        except Exception:
            placement = None

        serializer.save(
            student=student,
            placement_supervisor=placement.workplace_supervisor if placement else None,
            Academic_supervisor=placement.academic_supervisor if placement else None,
        )

    def perform_update(self, serializer):
        instance = self.get_object()
        user = self.request.user  # FIX: was using undefined 'user' variable

        # Business Logic: Lock approved logs unless admin
        if instance.status == 'APPROVED' and user.role != 'ADMIN':
            raise ValidationError("You cannot edit a log once it has been approved.")

        serializer.save()

    def perform_destroy(self, instance):
        # Prevent deletion of approved logs
        if instance.status == 'APPROVED':
            raise ValidationError("You cannot delete a log that has been approved.")

        instance.delete()


    @action(detail= True , methods=['post'])
    def approve_log_view(self, request, pk=None):
        log=self.get_object()

        log.status= "Approved"
        log.save()

        return Response({'status': 'log approved and student notified'}, status=status.HTTP_200_OK)



        

