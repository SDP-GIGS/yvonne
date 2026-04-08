from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

class review(models.Model):
    Student=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                              related_name="reviews_recieved",
 limit_choices_to={"role":"Student"})
    
    Academic_supervisor=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews_received",
        limit_choices_to=("role:Academic_supervisor")
    )

    Placement=models.ForeignKey(
        "placements.internshipPlacement",
        on_delete=models.CASCADE
    )

    week=models.PositiveIntegerField()
    score=models.DecimalField(max_digits=5,decimal_places=2)
    feedback=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    


def __string__(self):
    return f"{self.student} -week{self.Week}"

def clean(self):
    if self.Academic_supervisor.role !="Academic_supervisor":
        raise ValidationError('Only Academic_supervisor can give reviews')
    

    #reviwing onl students
    if self.Student.role != "Student":
        raise ValidationError("only students can be reviewed")
    

    #avoiding duplicates of weekly reviews
    if review.objects.filter(
        Student=self.Student,
        week=self.Week,

    ). exclude(pk=self.pk).exists():
        raise ValidationError('review already exists for this week.')
def save(self,*args,**kwargs):
  self.full_clean()
  super().save(*args,**kwargs) 
    

# Create your models here.
