# Generated by Django 4.0.3 on 2022-06-21 00:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_alter_record_auto_alter_record_customer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='sales_price',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
