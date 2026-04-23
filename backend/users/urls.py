from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'users', UserViewSet)



urlpatterns = [
    path('', include(router.urls)),
    #Standard JWT login path
    path('login/',MyTokenObtainPairView.as_view, name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
