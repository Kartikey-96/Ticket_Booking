# Generated by Django 4.0.6 on 2023-08-16 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_movie_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='theater',
            name='movie_timing',
            field=models.DateTimeField(default=None, null=True),
        ),
    ]
