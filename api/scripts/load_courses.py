from school.models import Course, School
import csv


def run():
    with open('UNLV_course_data/courses.csv') as file:
        reader = csv.reader(file)
        # Advance past the header
        next(reader)  

        Course.objects.all().delete()

        for row in reader:
            print(row)

            school, _ = School.objects.get_or_create(short_name='UNLV',
                                                     website='https://www.unlv.edu/',
                                                     state='Nevada',
                                                     city='Las Vegas',
                                                     country='United States')
            school.save()

            course = Course(school=school,
                            subject=row[0],
                            catalog_number=row[1],
                            title=row[2])
            course.save()