import requests
import pandas as pd
from bs4 import BeautifulSoup

row_data = []

# Not a dynamic way to go through every page, but works for our case.
for i in range(0, 64):
    url = "https://www.unlv.edu/online/courses?page={0}".format(i)

    # Send a GET request to the URL
    response = requests.get(url)
    print(response)

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", class_ = "table table-hover")

    for row in table.find_all('tr'):
        col = row.find_all('td')
        col = [tr.text.strip() for tr in col]
        row_data.append(col)
    
    #time.sleep(1)

df = pd.DataFrame(row_data)

# Drop professor and type columns, drop empty rows
df.drop(df.columns[[3,4]], axis=1, inplace=True)
df.dropna(inplace=True)

# Drop all duplicate courses
df.drop_duplicates(keep='first', inplace=True)

# Save to csv file with appropriate header
df.to_csv('courses.csv', sep=',', index=False, header=['Subject', 'Catalog Number', 'Title'])
