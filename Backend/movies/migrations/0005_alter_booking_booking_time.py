# Generated by Django 4.0.6 on 2023-08-16 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_booking_booking_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_time',
            field=models.DateTimeField(auto_created=True),
        ),
    ]
