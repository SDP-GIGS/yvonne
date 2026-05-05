from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/',include('djoser.urls')),
    path('api/auth/',include('djoser.urls.jwt')),   
      
    path('api/logs/', include('logs.urls')),
    path('api/placements/', include('placements.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/evaluations/', include('evaluations.urls')),
]
