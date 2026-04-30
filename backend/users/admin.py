from django.contrib import admin
from .models import CustomUser, SupervisorApplication, StaffProfile

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(SupervisorApplication)
admin.site.register(StaffProfile)
