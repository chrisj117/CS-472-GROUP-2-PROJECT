from school.models import Course, School, Professor
import csv


def run():
    with open('UNLV_course_data/courses_with_professors.csv') as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        Course.objects.all().delete()

        for row in reader:
            print(row)

            school, _ = School.objects.get_or_create(
                short_name='UNLV',
                defaults={
                    'website': 'https://www.unlv.edu/',
                    'state': 'Nevada',
                    'city': 'Las Vegas',
                    'country': 'United States'
                }
            )
            school.save()

            subject, catalog_number, title, professor_names = row

            course, created = Course.objects.get_or_create(
                school=school,
                subject=subject,
                catalog_number=catalog_number,
                defaults={'title': title}
            )

            if created or professor_names:
                course.professors.clear()
                for name in professor_names.split(", "):
                    name_parts = name.strip().split(" ")
                    if len(name_parts) == 2:
                        first_name, last_name = name_parts
                    elif len(name_parts) == 1:
                        first_name, last_name = name_parts[0], ""
                    else:
                        continue

                    professor, _ = Professor.objects.get_or_create(
                        first_name=first_name.strip(),
                        last_name=last_name.strip(),
                    )
                    professor.schools.add(school)
                    course.professors.add(professor)

            course.save()
            print(f"Processed course: {course.subject} {course.catalog_number}")