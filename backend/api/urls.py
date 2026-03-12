from django.urls import path

from . import views

urlpatterns = [
	path("hello/", views.simple_string, name="simple-string"),
]
