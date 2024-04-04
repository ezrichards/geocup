# GeoCup

I like code, and I like GeoGuessr, so I made a website for the GeoCup!

The **GeoCup** is a mini competition I'm holding with friends over the entire month of April.
We'll be doing one asynchronous challenge link on GeoGuessr _every day_. Move, pan, zoom is
allowed and we're playing with 2 minute rounds on World. Everyone is welcome -- play at [geocup.pages.dev](https://geocup.pages.dev)!

The leaderboard will be updated everyday and the next day's link will be released shortly after. The winner gets something, idk.

## Loading Results

To load data:
- Save results from the API URL as json: `https://www.geoguessr.com/api/v3/results/highscores/GAME_CODE`
- Put that file as `data.json` in the `stats` folder.
- Run `python aggregate.py`

Results will be in `totals-aggregated.json` - make sure this looks good, and then delete the old totals.json
file and replace it with the new one.
