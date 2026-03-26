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
# Create your models here.
