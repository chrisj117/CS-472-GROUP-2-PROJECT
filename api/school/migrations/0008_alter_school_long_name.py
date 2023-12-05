# Generated by Django 4.2.5 on 2023-12-05 19:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("school", "0007_professor_course_professors"),
    ]

    operations = [
        migrations.AlterField(
            model_name="school",
            name="long_name",
            field=models.CharField(
                default="University of Nevada, Las Vegas",
                max_length=255,
                unique=True,
                verbose_name="LongName",
            ),
        ),
    ]
