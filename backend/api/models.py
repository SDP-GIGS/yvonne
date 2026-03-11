from django.db import models

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

# Create your models here.
