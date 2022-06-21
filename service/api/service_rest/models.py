from django.db import models

# Create your models here.


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveBigIntegerField(unique=True)


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=200)
    date = models.DateField(null=True, default=True)
    time = models.TimeField(null=True, default=True)
    description = models.TextField()
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
        related_name= "service_appointment",
    )
