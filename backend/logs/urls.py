from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WeeklyLogViewSet

# 1. Initialize the Router
router = DefaultRouter()

# 2. Register the ViewSet
# The 'r' before 'logs' stands for "raw string" to handle backslashes correctly.
# The base name helps the router to know which model to point to since we are using the get_queryset method DRF can go inside the method to find which model to point to so we have to define it manually or automatiacally by defining the queryset= weeklog.objects.all
router.register(r'', WeeklyLogViewSet, basename="WeeklyLog")

# 3. Define the URL patterns
urlpatterns = [
    path('', include(router.urls)), # This includes all routes created by the router
]