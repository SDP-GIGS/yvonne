from django.urls import path
from .views import UserViewSet, MyTokenObtainPairView, LogoutView, SupervisorApplicationViewSet
from rest_framework_simplejwt.views import TokenRefreshView

# User ViewSet Actions
user_list = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_detail = UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

user_me = UserViewSet.as_view({
    'get': 'me'
})

user_change_password = UserViewSet.as_view({
    'post': 'change_password'
})

user_deactivate = UserViewSet.as_view({
    'post': 'deactivate'
})


# Supervisor Application ViewSet Actions
supervisor_list = SupervisorApplicationViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

supervisor_detail = SupervisorApplicationViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

supervisor_approve = SupervisorApplicationViewSet.as_view({
    'post': 'approve'
})

supervisor_reject = SupervisorApplicationViewSet.as_view({
    'post': 'reject'
})


urlpatterns = [
    # Auth endpoints
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # User endpoints
    path('users/', user_list, name='user-list'),
    path('users/me/', user_me, name='user-me'),
    path('users/change_password/', user_change_password, name='user-change-password'),
    path('users/<int:pk>/', user_detail, name='user-detail'),
    path('users/<int:pk>/deactivate/', user_deactivate, name='user-deactivate'),
    

    # Supervisor Application endpoints
    path('supervisor-applications/', supervisor_list, name='supervisor-list'),
    path('supervisor-applications/<int:pk>/', supervisor_detail, name='supervisor-detail'),
    path('supervisor-applications/<int:pk>/approve/', supervisor_approve, name='supervisor-approve'),
    path('supervisor-applications/<int:pk>/reject/', supervisor_reject, name='supervisor-reject'),
]
