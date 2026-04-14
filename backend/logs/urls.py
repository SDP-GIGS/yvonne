from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WeeklyLogViewSet

# 1. Initialize the Router
router = DefaultRouter()

# 2. Register the ViewSet
# The 'r' before 'logs' stands for "raw string" to handle backslashes correctly.
router.register(r'logs', WeeklyLogViewSet)

# 3. Define the URL patterns
urlpatterns = [
    path('', include(router.urls)), # This includes all routes created by the router
]