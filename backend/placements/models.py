from django.db import models
from django.conf import settings

class InternshipPlacement(models.Model):
    student = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='placement')
    workplace_supervisor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='supervised_interns')
    company_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    department = models.CharField(max_length=255, blank = True, null = True)
    status = models.CharField(max_length=20, default='pending')  # pending, approved, rejected
    academic_supervisor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='academic_interns')
    
    
    def __str__(self):
        return f"{self.student.email} at {self.company_name}"
    

    



