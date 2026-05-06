from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SupervisorReview
from .serializers import SupervisorReviewSerializer

class WeeklyReviewViewSet(viewsets.ModelViewSet):
    queryset = SupervisorReview.objects.all()
    serializer_class = SupervisorReviewSerializer
    permission_classes = [IsAuthenticated]
    
    

    def perform_create(self, serializer):
        # Automatically set the supervisor to the logged-in user
        review = serializer.save(supervisor=self.request.user)
        
        # Logic to update the WeeklyLog status to 'APPROVED'
        log = review.log
        log.status = 'APPROVED'
        log.save()
        
# Create your views here.
