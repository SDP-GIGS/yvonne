from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InternshipPlacementViewSet

router = DefaultRouter()

# Registering the placement module
router.register(r'placements', InternshipPlacementViewSet)

urlpatterns = [
    path('', include(router.urls)), # Square brackets [] hold the list of paths
]

