# Generated by Django 4.0.3 on 2022-06-24 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_serviceappointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceappointment',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]
