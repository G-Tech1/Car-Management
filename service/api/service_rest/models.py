from django.db import models

# Create your models here.


class AutomobileVO(models.Model):
    vin= models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveBigIntegerField(unique=True)


class Status(models.Model):
    """
    The Status model provides a status to a Service Appointment, which
    can be SUBMITTED, COMPLETED, or CANCELED.

    Status is a Value Object and, therefore, does not have a
    direct URL to view it.
    """
    
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    date = models.DateField(null=True, default=True)
    time = models.TimeField(null=True, default=True)
    description = models.TextField()
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
        related_name= "service_appointment",
    )
    status = models.ForeignKey(
        Status,
        related_name="service_appointment",
        on_delete=models.PROTECT,
        default = 1
    )

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="SUBMITTED")
        service = cls(**kwargs)
        service.save()
        return service

    def complete(self):
        status = Status.objects.get(name="COMPLETED")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()