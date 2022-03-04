# Generated by Django 3.1.4 on 2021-12-23 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_review_createdat'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('type', models.IntegerField(blank=True, null=True)),
                ('sum', models.FloatField(blank=True, null=True)),
                ('job_id', models.IntegerField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
    ]
