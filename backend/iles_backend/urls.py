from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # FIX: was duplicating users.urls under both api/token/ AND api/users/
    # Now: token/auth endpoints live under api/token/, user CRUD under api/users/
    path('api/token/', include('users.urls')),   # login, refresh, logout
    path('api/users/', include('users.urls')),   # users CRUD, me, change_password
    path('api/logs/', include('logs.urls')),
    path('api/placements/', include('placements.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/evaluations/', include('evaluations.urls')),
]
