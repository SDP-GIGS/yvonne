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
     student=models.ForeignKey(students, null=True,on_delete=models.SET_NULL)

class workplace_supervisor(models.Model):
      name=models.CharField(max_length=100)
      email=models.EmailField() 
      phone=models.CharField(max_length=14)
      position=models.CharField(max_length=100)

class administrator(models. Model):
   name=models.CharField(max_length=100)
   email=models.EmailField()
   phone=models.CharField(max_length=10)
    
   

class company(models.Model):
    id=models.AutoField(primary_key=True)
    company_name=models.CharField()
    email=models.CharField()
    phone_number=models.CharField(max_length=10)
    location=models.CharField()
    website=models.URLField()


class internship(models.Model):
    id=models.AutoField(primary_key= True)
    title=models.CharField()
    description=models.CharField()
    requirements=models.CharField()
    location=models.CharField()
    duration=models. DateTimeField()
    stipend=models.DecimalField(max_digits=10 ,decimal_places=0)
    deadline=models.DateField()
    company=models.ForeignKey(company,on_delete=models.CASCADE)
    dated_posted=models.DateField(auto_now_add=True)


class appplication_model(models.Model):
    id=models.AutoField(primary_key=True)
    student=models.ForeignKey(students,null=True,on_delete=models.SET_NULL)
    internship=models.ForeignKey(internship, on_delete=models.CASCADE)
    cover_letter=models.TextField()
    status_choices=[
        ('PENDING','pending'),
        ('ACCEPTED', 'accepted'),
        ('REJECTED','rejected')

    ]
    status=models.CharField(max_length=12,choices=status_choices, default='PENDING')
    date_applied=models.DateTimeField(auto_now_add=True)
    
   
class internshipreport_model(models.Model):
    id=models.AutoField(primary_key=True)
    student=models.ForeignKey(students,on_delete=models.CASCADE)
    internship=models.ForeignKey(internship,on_delete=models.CASCADE)
    report_file=models.FileField()
    submission_date=models.DateTimeField(auto_now_add=True)
    feedback=models.CharField()
    status_choices=[
        ('PENDING','pending'),
        ('ACCEPTED','accepted'),
        ('REJECTED','rejeceted')
    ]
    status=models.CharField(max_length=12, choices=status_choices, default='PENDING')
       
     
class  WeeklyLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    internship=models.ForeignKey(internship,null=True,on_delete=models.SET_NULL)
    week_start = models.DateField()
    week_number=models.CharField()
    content = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta :
        unique_together = ['user','week_start']  

    def __str__(self):
        return f"{self.user.username} - Week of {self.week_start}"       
    




