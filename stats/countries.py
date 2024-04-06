import json
import requests

def is_location_in_country(lat, lon, locationCode):
    resp = requests.get(f'https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}')
    try:
        return resp.json()['address']['country_code'] == locationCode
    except KeyError:
        return -1

with open("countries.json", "r") as file:
    existing_data = json.load(file)
    if existing_data is None:
        existing_data = { "countries": [] }

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
            country = rounds[guessNum]
            correct = is_location_in_country(guess['lat'], guess['lng'], country)
            if correct == -1:
                print(f"    Couldn't reverse geocode for {playerName} on {country}..")
                continue

            print(f"    {country}", correct)
            if correct:
                country_found = False
                for entry in existing_data["countries"]:
                    if country in entry:
                        for player_entry in entry[country]:
                            if player_entry["name"] == playerName:
                                player_entry["count"] += 1
                                country_found = True
                                break
                        else:
                            entry[country].append({"name": playerName, "count": 1})
                            country_found = True
                        break
                if not country_found:
                    existing_data["countries"].append({country: [{"name": playerName, "count": 1}]})
            guessNum += 1
        print()

"""
{
    "countries": [
        "us": {
            {
                name: 'ethanzr'
                count: 2
            }
        }
    ]
}
"""

# updated_data = {
#     "countries": []
# }

with open("countries_updated.json", "w") as file:
    json.dump(existing_data, file, indent=4)
