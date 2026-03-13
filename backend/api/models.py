from django.db import models
from django.contrib.auth.models import User


class students(models.Model):
    name= models.CharField(max_length=100)
    reg_number=models.CharField(max_length=50)
    email=models.EmailField()
    course=models.CharField(max_length=100)
    year_of_study=models.IntegerField()
    phone_number=models.CharField(max_length=10)

    class academic_supervisor(models.Model):
     name=models.Charfeld(max_length=100)
     user_id=models.Charfield(max_length=50)
     email=models.EmailField()
     phone=models.CharFieldField(max_length=13)
     department=models.Charfield(max_length=50)
     office_location=models.CharField(max_length=100)
     specialization= models.CharField()

     class workplace_supervisor(models.Model):
      name=models.CharField(max_length=100)
      email=models.EmailField() 
      phone=models.CharField(max_length=14)
      position=models.CharField(max_length=100)
     
class  WeeklyLog(models.model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week_start = models.DateField()
    content = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta :
        unique_together = ['user','week_start']  

    def _str_(self):
        return f"{self.user.username} - Week of {self.week_start}"       
    


# Create your models here.

