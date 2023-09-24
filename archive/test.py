import pandas as pd
import re
output = r"D:\cs222dataset\group-project-team73\archive"
test = pd.read_csv("D:\cs222dataset\group-project-team73\\archive\\test.csv")
print((test['Year'][3]))
print(type(test["Year"][3]))
# print(type(test["Year"][197]))
# print(test['Year'][199])
index_list = []
for index, value in enumerate(test['Year']):
    if isinstance(value, str):
        index_list.append(index)
print(len(index_list))
# print(index_list)
# print(type(test["Year"][0]))
# pattern = r"\((\d+)\u2013 ?(\d*)\)"
# match = re.search(pattern, test["Year"][0])
# if match:
#     print("yes")
# else:
#     print("no")
# test_list = []
# for index, value in enumerate(test["Year"]):
#     if pd.isna(value):
#         test_list.append(index)
#         continue
#     match = re.search(pattern, value)
#     if not match:
#         test_list.append(index)
# print(len(test_list))
# print(len(test['Year']))
# print(test_list)
# print(len(test_list) == len(test['Year']))
# print(test['Year'][1])