from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import WeeklyLog

@receiver(post_save,sender=WeeklyLog)
def notify_students_status(sender, instance,created, **kwargs):
  if not created:
    subject= f'InSync_ILES: WeeklyLog Update -Week {instance.week_number}'
    message=f'Hello {instance.student.first_name},\n\nYour log status has been updated to:{instance.status}.'
    
    

    send_mail(
      subject,
      message,
      'noreply@insync-iles.com',
      [instance.student.email],
      fail_silently=False
    )




    