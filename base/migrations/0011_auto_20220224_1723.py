# Generated by Django 3.1.4 on 2022-02-24 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_zadanie2'),
    ]

    operations = [
        migrations.AddField(
            model_name='zadanie2',
            name='user_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='zadanie2',
            name='user_email',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='zadanie2',
            name='user_phone',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
