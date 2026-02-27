import json
import pandas as pd
import re

with open('solaris-results-2026-02-27.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ratings_dict = {}
all_members = set()

for movie_id, movie_data in data.items():
    title = movie_data['title'].replace(' 短评', '')
    ratings_dict[title] = {}
    
    for user_rating in movie_data['users']:
        match = re.match(r'(.+?)\((\d+)★\)', user_rating)
        if match:
            member = match.group(1)
            rating = int(match.group(2))
            ratings_dict[title][member] = rating
            all_members.add(member)

all_members = sorted(all_members, key=lambda x: x.lower())

df = pd.DataFrame(index=sorted(ratings_dict.keys()), columns=all_members)

for title, ratings in ratings_dict.items():
    for member, rating in ratings.items():
        df.at[title, member] = rating

df.to_excel('solaris-results-2026-02-27.xlsx')
print("Excel文件已生成：solaris-results-2026-02-27.xlsx")
