import requests
import pandas as pd
from bs4 import BeautifulSoup
from collections import defaultdict

# Store course data with professors
course_data = defaultdict(set)

# Not a dynamic way to go through every page, but works for our case.
for i in range(0, 64):
    url = "https://www.unlv.edu/online/courses?page={0}".format(i)
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", class_ = "table table-hover")

    for row in table.find_all('tr'):
        cols = row.find_all('td')
        if cols:
            subject = cols[0].text.strip()
            catalog_number = cols[1].text.strip()
            title = cols[2].text.strip()
            professor = cols[3].text.strip()

            course_key = (subject, catalog_number, title)

            course_data[course_key].add(professor)

rows = []
for (subject, catalog_number, title), professors in course_data.items():
    row = {
        'Subject': subject,
        'Catalog Number': catalog_number,
        'Title': title,
        'Professors': ', '.join(professors)
    }
    rows.append(row)

# Create DataFrame
df = pd.DataFrame(rows)

# Save to csv file with appropriate header
df.to_csv('courses_with_professors.csv', sep=',', index=False)