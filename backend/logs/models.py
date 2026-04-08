from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
class Weeklylog(models.Model):
    Student=models.ForeignKey( settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        limit_choices_to={"role":"STUDENT"},
        related_name="Weeklylog"
    )   
    Week_number=models.PositiveIntegerField()
    objectives=models.TextField()

class Meta:
    unique_together=("student","Week_number")     
    ordering=["-Week-number"]  

def clean(self):
    """" Custom Validation for role and deadlines"""
    if self.Student.role != "STUDENT":
        raise ValidationError('Only students can submit the weekly logs')


    #put fixed deadlines every week
    now=timezone.now()  
    if self.created_at and self.created_at > (timezone.now() + timedelta(days= 7 )):
      raise ValidationError("The submission deadline for this week has already passed.")


def save(self, *args,**kwargs):
    self.fuul_clean()
    super().save(*args, **kwargs)



def __str__(self):
    return f"Week {self.Week_number} -{self.Student.username}"
# Create your models here.
