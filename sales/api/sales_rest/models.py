from ctypes import addressof
from unittest.mock import mock_open
from django.db import models

# Create your models here.


class AutoVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField()
    # sales = models.ManyToManyField('Record', blank=True)


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=100)


class Record(models.Model):
    auto = models.ForeignKey(AutoVO, related_name="records", on_delete=models.PROTECT)
    sales_person = models.ForeignKey(
        SalesPerson, related_name="records", on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="records",
        on_delete=models.PROTECT,
    )
    sales_price = models.CharField(max_length=100, null=True, blank=True)
