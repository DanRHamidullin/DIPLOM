# Generated by Django 3.1.4 on 2021-12-28 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_invoice'),
    ]

    operations = [
        migrations.CreateModel(
            name='Zadanie2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.TextField(blank=True, null=True)),
                ('user_phone', models.TextField(blank=True, null=True)),
            ],
        ),
    ]