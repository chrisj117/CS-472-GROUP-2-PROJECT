# Generated by Django 4.2.5 on 2023-11-03 23:03

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RequestSchool',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('school_name', models.CharField(max_length=50)),
                ('website', models.URLField()),
            ],
            options={
                'verbose_name_plural': 'RequestSchools',
            },
        ),
    ]
