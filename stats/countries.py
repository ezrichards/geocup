import json

import requests

# from geopy.geocoders import Nominatim
# from geopy.exc import GeocoderTimedOut

# def is_location_in_country(lat, lng, country_code):
#     geolocator = Nominatim(user_agent="geoapiExercises")
#     try:
#         location = geolocator.reverse((lat, lng), exactly_one=True)
#         if location.raw['address']['country_code'] == country_code.upper():
#             return True
#         else:
#             return False
#     except (KeyError, GeocoderTimedOut):
#         print("Error: Could not determine country for given location.")
#         return False

# Given lat, lng, and streakLocationCode
# lat = 46.970359802246094
# lng = -120.50457000732422
# streak_location_code = "us"

# # Check if the location matches the streakLocationCode country
# result = is_location_in_country(lat, lng, streak_location_code)
# print("Location matches streakLocationCode country:", result)

with open("countries.json", "r") as file:
    existing_data = json.load(file)

    # print(existing_data)

users = []
with open(input(), "r") as file:
    game_data = json.load(file)

    for item in game_data['items']:
        users.append(item['playerName'])

    for user in users:
        for round in game_data['items'][0]['game']['rounds']:
            result = is_location_in_country(round['lat'], round['lng'], round['streakLocationCode'])
            print("Location matches streakLocationCode country:", result)

            # result = input(f"Did {user} guess correct in {round['streakLocationCode']}? (y/n): ")
            # if result.lower() == "y":
                # pass
            # else:
                # print("Invalid input, exiting..")
                # exit(0)

"""
{
    countries: [
        "us": {
            {
                name: 'ethanzr'
                count: 2
            }
        }
    ]
}
"""

#   "totals": [
#     {
#       "name": "ethanzr",
#       "countries": [
#         {
#           "code": "us",
#           "count": 5
#         },
updated_data = {
    "countries": []
}

with open("countries_updated.json", "w") as file:
    json.dump(updated_data, file, indent=4)
