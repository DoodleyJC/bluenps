from django.db import models

# Create your models here.



class CourtPresence(models.Model):
    name = models.CharField(max_length=200)
    time = models.DateField()
    court = models.CharField(max_length=100)