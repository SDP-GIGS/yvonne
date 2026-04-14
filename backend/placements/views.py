from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import InternshipPlacement
from .serializers import PlacementSerializer

class InternshipPlacementViewSet(viewsets.ModelViewSet):
    queryset = InternshipPlacement.objects.all()
    serializer_class = PlacementSerializer
    permission_classes = [IsAuthenticated]

# Create your views here.
