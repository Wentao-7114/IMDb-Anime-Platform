
# Data Cleaning and Preprocessing for anime dataset

import numpy as np
import pandas as pd
import seaborn as sb
import matplotlib.pyplot as plt
import json

sb.set()
pd.set_option('display.max_columns', None)

file_path = './Dataset/anime.csv'

# Load Data
data = pd.read_csv(file_path)
print("Initial Data: ", data.shape)
print("Missing values in initial dataframe:")
print(data.isnull().sum())

# Dropping unnecessary columns
columns_to_drop = ['main_picture', 'created_at', 'updated_at', 'background']
data_clean = data.drop(columns=columns_to_drop)

# Handling missing data by filling NA values with a default value or using other techniques like forward-fill, backward-fill, or interpolation
fill_values = {
    "synopsis": "No Synopsis",
    "end_date": "Airing",
    "broadcast": "{'day_of_the_week': 'NIL', 'start_time': 'NIL'}",
    "source": "Unknown",
    "rating": "No Rating",
    "genres": "[{'id': -1, 'name': 'No Genre'}]",
    "mean": -1
}

data_clean.fillna(value=fill_values, inplace=True)

# Data transformation functions
def split_json_column(df, column, keys):
    df[keys] = df[column].apply(lambda x: pd.Series(json.loads(str(x).replace("'", "\"")))[keys])
    df.drop(columns=[column], inplace=True)

def split_statistics(df):
    keys = ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']
    stats = df['statistics'].apply(lambda x: pd.Series(json.loads(str(x).replace("'", "\""))['status'])[keys])
    stats.columns = ['statistics_' + col for col in keys]
    return pd.concat([df, stats], axis=1).drop(columns=['statistics'])

# Apply transformations
split_json_column(data_clean, 'start_season', ['year', 'season'])
split_json_column(data_clean, 'broadcast', ['day_of_the_week', 'start_time'])
data_clean = split_statistics(data_clean)

print("Cleaned Data: ", data_clean.shape)
print("Missing values in cleaned dataframe:")
print(data_clean.isnull().sum())

