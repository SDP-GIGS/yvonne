from django.db import models
from django.conf import settings

class InternshipPlacement(models.Model):
    student = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='placement')
    workplace_supervisor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='supervised_interns')
    company_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    
    def __str__(self):
        return f"{self.student.username} at {self.company_name}"
    

    


# Create your models here.
