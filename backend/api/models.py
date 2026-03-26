from django.db import models
from django.contrib.auth.models import User


class Students(models.Model): 
    
    id=models.AutoField(primary_key=True)
    name= models.CharField(max_length=100)
    reg_number=models.CharField(max_length=50)
    email=models.EmailField()
    course=models.CharField(max_length=100)
    year_of_study=models.IntegerField()
    phone_number=models.CharField(max_length=10)
    password=models.CharField(max_length=14)
    cv=models.FileField(upload_to="cvs")
    date_craeted=models.DateTimeField(auto_now_add=True)

class academic_supervisor(models.Model):
     name=models.CharField(max_length=100)
     user_id=models.AutoField(primary_key=True)
     email=models.EmailField()
     phone=models.CharField(max_length=13)
     department=models.CharField(max_length=50)
     office_location=models.CharField(max_length=100)
     specialization= models.CharField()
     student=models.ForeignKey(Students, null=True,on_delete=models.SET_NULL)

# Create your models here.
