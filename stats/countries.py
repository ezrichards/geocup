import json
import requests

def is_location_in_country(lat, lon, locationCode):
    resp = requests.get(f'https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}')
    return resp.json()['address']['country_code'] == locationCode

with open("countries.json", "r") as file:
    existing_data = json.load(file)

    # print(existing_data)

users = []
with open(input(), "r") as file:
    game_data = json.load(file)

    for item in game_data['items']:
        users.append(item['playerName'])

    rounds = {}
    roundNum = 1
    for round in game_data['items'][0]['game']['rounds']:
        rounds.update({ roundNum: round['streakLocationCode'] })
        roundNum += 1

    for item in game_data['items']:
        playerName = item['playerName']
        guesses = item['game']['player']['guesses']
        print(f"Guesses for {playerName}:")
        guessNum = 1
        for guess in guesses:
            print(f"    {rounds[guessNum]}", is_location_in_country(guess['lat'], guess['lng'], rounds[guessNum]))
            guessNum += 1
        print()

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

updated_data = {
    "countries": []
}

with open("countries_updated.json", "w") as file:
    json.dump(updated_data, file, indent=4)
