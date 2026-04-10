from django.db import models
from django.conf import settings 

class WeeklyLog(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        SUBMITTED = 'SUBMITTED', 'Submitted'
        REVIEWED ='REVIEWED', 'Reveiwed'
        APPROVED = 'APPROVED', 'Approved'

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete =models.CASCADE,
        related_name ='logs'
    ) 
    
    

    week_number = models.PositiveIntegerField()
    start_date = models.DateField() 
    end_date =models.DateField()

    activities_performed = models.TextField(blank =True , null = True)
    lessons_learned = models.TextField(blank =True ,null= True)
    challenges_faced = models.TextField(blank =True, null =True)

    status = models.CharField(
        max_length =20,
        choices =Status.choices,
        default =Status.DRAFT
    )  

    created_at = models.DateTimeField(auto_now_add =True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['student', 'week_number']

    def __str__(self):
        return f"Week {self.week_number} - {self.student.username}"      

                                    
# Create your models here.
