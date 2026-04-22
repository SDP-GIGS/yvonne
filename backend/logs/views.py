from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import WeeklyLog
from .serializers import WeeklyLogSerializer
from rest_framework.exceptions import ValidationError
   

class WeeklyLogViewSet(viewsets.ModelViewSet):
    serializer_class = WeeklyLogSerializer

    #authentication$permissions
    #only logged in users with a valid token session can enter
    permission_classes=[IsAuthenticated  ]

    #Queryset filtering (data_privacy)
    def get_queryset(self):
        user = self.request.user
        # RBAC: Students see their own logs; Supervisors see their assigned interns
        if user.role == 'STUDENT':
            return WeeklyLog.objects.filter(student=user)
        if user.role == 'SUPERVISOR':
            return WeeklyLog.objects.filter(placement__supervisor=user)
        if user.role=="ADMIN":
           return WeeklyLog.objects.all()
        if user.role=="ACADEMIC_SUPERVISOR":
            return WeeklyLog.objects.filter(Academic_supervisor=user)
        return WeeklyLog.objects.none()

    def perform_update(self, serializer):
        instance = self.get_object()
        # Business Logic: Lock the log if it's already been Approved
        
        if instance.status == 'APPROVED' and not user.role=="ADMIN":
            if user.role=="STUDENT":
              raise ValidationError("You cannot edit a log once it has been approved.")
        serializer.save()

        #allowing students to delete a log once it was not intended
    def perform_destroy(self, instance):
        #prevent deletion of approved logs
        if instance.status=="APPROVED":
            raise ValidationError("You can not delete a log that has been approved")
        instance.delete()
        

    



# Create your views here.
