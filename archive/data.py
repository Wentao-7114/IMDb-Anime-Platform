import pandas as pd
import numpy as np
import os
import re

workspace = "D:\cs222dataset\group-project-team73\\archive"
output = "D:\cs222dataset\group-project-team73\\archive"


def process_data(input_csv, output_csv):
    anime = pd.read_csv(input_csv)
    anime["Runtime"] = anime["Runtime"].fillna(0)
    delete_rows = 0
    for index, value in enumerate(anime["Runtime"]):
        if value == 0:
            continue
        if "Runtime" in value:
            current = index
            anime.drop(range(index + 1), inplace=True)  # repetition in the dataset
            delete_rows += (index + 1)
        else:
            value = value.split()
            temp = value[0]
            anime["Runtime"][index] = temp
    anime.reset_index(drop=True, inplace=True)
    pattern = r"\((\d+)(?:-(\d+))?\)"
    pattern2 = r"\((\d+)\u2013 ?(\d*)\)"
    pattern3 = r"\((?:II\s*)?(\d{4})"
    for index, value in enumerate(anime["Year"]):
        if pd.isna(value):
            anime["Year"][index] = None
        else:
            match = re.search(pattern, value)
            match2 = re.search(pattern2, value)
            match3 = re.search(pattern3, value)
            if match:
                start_year = match.group(1)
                end_year = match.group(2)
                start_year = int(start_year)
                end_year = int(end_year) if end_year else None
                year_range = (start_year, end_year)
                anime['Year'][index] = year_range
            elif match2:
                start_year = match2.group(1)
                end_year = match2.group(2)
                start_year = int(start_year)
                end_year = int(end_year) if end_year else None
                year_range = (start_year, end_year)
                anime['Year'][index] = year_range
            elif match3:
                start_year = match3.group(1)
                start_year = int(start_year)
                year_range = start_year
                anime['Year'][index] = year_range
    index_list = []
    for index, value in enumerate(anime["Year"]):
        if not (isinstance(value, tuple) or value is None or isinstance(value, int)):
            index_list.append(index)
    for i in index_list:
        anime["Year"][i] = None
    name = ["Number of Votes", "User Rating", "Metascore", "Gross"]
    for string in name:
        anime[string] = anime[string].fillna(0)
    anime.to_csv(output_csv, index=False)


if os.path.exists("process.csv"):
    anime = pd.read_csv("process.csv")
    print("we already processed the data")
else:
    process_data("D:\cs222dataset\group-project-team73\\archive\imdb_anime.csv", "process.csv")
    print("process data and store in process.csv")
print(anime["Runtime"][90])
