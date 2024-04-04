# gpt wrote this lol

import json

# Load existing player information from totals.json
with open("totals.json", "r") as file:
    existing_data = json.load(file)

# Initialize a dictionary to store player information
player_info = {}

# Add existing player information to the dictionary
for item in existing_data["totals"]:
    player_info[item["name"]] = {
        "totalScore": item["totalScore"],
        "totalTime": item["totalTime"],
        "perfects": item.get("perfects", 0),  # Include 'perfects' field if it exists
    }

# Load the JSON data from the file
with open("data.json", "r") as file:
    data = json.load(file)

# Update player information with new data
for item in data["items"]:
    player_name = item["playerName"]
    total_score = item["totalScore"]
    total_time = item["game"]["player"]["totalTime"]
    perfects = item.get("perfects", 0)  # Get 'perfects' field if it exists

    # If player exists, update their score, time, and perfects
    if player_name in player_info:
        player_info[player_name]["totalScore"] += total_score
        player_info[player_name]["totalTime"] += total_time
        player_info[player_name]["perfects"] += perfects
    else:
        # If player doesn't exist, add them to the dictionary
        player_info[player_name] = {
            "totalScore": total_score,
            "totalTime": total_time,
            "perfects": perfects,
        }

# Convert player_info dictionary to list of dictionaries
updated_data = {
    "totals": [{"name": key, **value} for key, value in player_info.items()]
}

# Save the updated data to totals_updated.json
with open("totals_updated.json", "w") as file:
    json.dump(updated_data, file, indent=4)
