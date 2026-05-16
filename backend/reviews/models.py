from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

class SupervisorReview(models.Model):
    # Link to the log being reviewed (Week 7: State transitions)
    weekly_log = models.OneToOneField(
        'logs.WeeklyLog', 
        on_delete=models.CASCADE, 
        related_name='review'
    )

 
    # The supervisor performing the review
    supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='given_reviews'
    )
    
    
    # Week 7 Assignment: Store review comments
    comments = models.TextField()
    
    # Fields for Week 9: Weighted scoring formulas
    # Example: score out of 100 for this specific week
    technical_score = models.PositiveIntegerField(default=0)
    professionalism_score = models.PositiveIntegerField(default=0)
    
    date_reviewed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.weekly_log.student.username} - Week {self.weekly_log.week_number}"
    
@receiver(post_save, sender=SupervisorReview)
def update_log_status(sender, instance, created, **kwargs):
    if created:
        log = instance.weekly_log
        log.status = 'REVIEWED'
        log.save()    
# Create your models here.
