from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import WeeklyLog
from .serializers import WeeklyLogSerializer
from rest_framework.exceptions import ValidationError
from logs.permissions import SupervisorOrStudent    

class WeeklyLogViewSet(viewsets.ModelViewSet):
    serializer_class = WeeklyLogSerializer

    #authentication$permissions
    #only logged in users with a valid token session can enter
    permission_classes=[IsAuthenticated, SupervisorOrStudent ]

    #Queryset filtering (data_privacy)
    def get_queryset(self):
        user = self.request.user
        # RBAC: Students see their own logs; Supervisors see their assigned interns
        if user.role == 'STUDENT':
            return WeeklyLog.objects.filter(student=user)
        if user.role == 'SUPERVISOR':
            return WeeklyLog.objects.filter(placement__supervisor=user)
        return WeeklyLog.objects.all()

    def perform_update(self, serializer):
        instance = self.get_object()
        # Business Logic: Lock the log if it's already been Approved
        if instance.status == 'APPROVED' and self.request.user.role == 'STUDENT':
            raise ValidationError("You cannot edit a log once it has been approved.")
        serializer.save()
    



# Create your views here.
