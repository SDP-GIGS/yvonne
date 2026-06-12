from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import WeeklyLog

@receiver(pre_save,sender=WeeklyLog)
def cache_old_status(sender, instance, **kwargs):
  
  
  try:
    instance._old_status=WeeklyLog.objects.get(pk=instance.pk).status
  except WeeklyLog.DoesNotExist:
   instance._old_status=None

@receiver(post_save,sender=WeeklyLog)
def notify_students_status(sender,instance,created,**kwargs):
  if created:
    return
  old_status=getattr(instance,"_old_status", None)
  
  if old_status!=instance.status:
    subject= f'InSync_ILES: WeeklyLog Update -Week {instance.week_number}'
    message=f'Hello {instance.student.first_name},\n\nYour log status has been updated to:{instance.status}.'
    
    


    send_mail(
      subject,
      message,
      'noreply@insync-iles.com',
      [instance.student.email],
      fail_silently=True
    )




    