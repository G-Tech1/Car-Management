from django.db import models

# Create your models here.


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveBigIntegerField()

