import pandas as pd
import numpy as np
import json

# Load and initially process data
data = pd.read_csv('./Dataset/anime.csv')

data_clean = data.drop(columns=['main_picture', 'created_at', 'updated_at', 'background'])
data_clean.fillna({
    "synopsis": "No Synopsis",
    "end_date": "Airing",
    "broadcast": "{'day_of_the_week': 'NIL', 'start_time': 'NIL'}",
    "source": "Unknown",
    "rating": "No Rating",
    "genres": "[{'id': -1, 'name': 'No Genre'}]",
    "mean": -1
}, inplace=True)

# Utility function to safely parse JSON and handle exceptions
def parse_json(entry):
    try:
        return json.loads(entry.replace("'", "\""))
    except json.JSONDecodeError:
        return None

# Split JSON fields into separate columns
def split_json_fields(data_clean):
    for index, row in data_clean.iterrows():
        for col in ['start_season', 'broadcast', 'statistics', 'studios', 'genres']:
            json_data = parse_json(row[col])
            
            if isinstance(json_data, dict):
                for key, value in json_data.items():
                    if isinstance(value, dict):  # Handling nested dictionaries
                        for subkey, subvalue in value.items():
                            data_clean.at[index, f'{col}_{key}_{subkey}'] = subvalue
                    else:
                        data_clean.at[index, f'{col}_{key}'] = value
            elif isinstance(json_data, list):  # Handling the case where the JSON data is a list
                data_clean.at[index, f'{col}'] = ", ".join([str(item) for item in json_data])

    data_clean.drop(columns=['start_season', 'broadcast', 'statistics', 'studios', 'genres'], inplace=True)

# Compute positive and negative viewership fractions
def compute_viewership_fractions(data_clean):
    cols_to_numeric = [
        'statistics_num_list_users', 'statistics_status_watching', 'statistics_status_completed',
        'statistics_status_on_hold', 'statistics_status_dropped', 'statistics_status_plan_to_watch'
    ]
    data_clean[cols_to_numeric] = data_clean[cols_to_numeric].apply(pd.to_numeric, errors='coerce')

    positive_cols = ['statistics_status_watching', 'statistics_status_completed', 'statistics_status_plan_to_watch']
    negative_cols = ['statistics_status_on_hold', 'statistics_status_dropped']

    data_clean['positive_viewership'] = data_clean[positive_cols].sum(axis=1)
    data_clean['negative_viewership'] = data_clean[negative_cols].sum(axis=1)

    data_clean['positive_viewership_fraction'] = data_clean['positive_viewership'] / data_clean['statistics_num_list_users']
    data_clean['negative_viewership_fraction'] = data_clean['negative_viewership'] / data_clean['statistics_num_list_users']

    data_clean.drop(columns=['positive_viewership', 'negative_viewership'], inplace=True)

# Main processing
split_json_fields(data_clean)
compute_viewership_fractions(data_clean)

# Saving the cleaned data to a CSV file
data_clean.to_csv('./Dataset/cleaned_data.csv', index=False)
