import fs from "fs";
import results from "../../../stats/totals.json";
import countries from "../../../stats/countries.json";
import Player from "../types/player";
import { Country, CountryData } from "../types/country";
import { Root } from "../types/json";

export const getResults = () => {
  const players: Player[] = [];
  const DAYS_PLAYED = fs.readdirSync("games").length;

  results.totals.map((item: any) =>
    players.push({
      name: item.name,
      totalPoints: Number(item.totalScore),
      totalTimeSeconds: Number(item.totalTime),
      percentage:
        String(
          Math.round(Number(item.totalScore / (25000 * DAYS_PLAYED)) * 100)
        ) + "%",
    })
  );
  return players;
};

type TotalPlayer = {
  name: string;
  totalPoints: number;
  totalTimeSeconds: number;
  totalDistance: number;
  totalPercentage: number;
  totalGamesPlayed: number;
};

type CountryResult = {
  country: string;
  players: Map<string, TotalPlayer>;
};

export const getResultsByCountry = () => {
  const files = fs.readdirSync("games");
  const resultsByCountry: Map<string, CountryResult> = new Map();

  files.forEach((file) => {
    const data: Root = JSON.parse(
      fs.readFileSync(`games/${file}`, { encoding: "utf-8" })
    );
    const items = data.items;

    items.forEach((item) => {
      // Assuming dynamic structure; replace any with a more specific type if possible
      const rounds = item.game.rounds;

      rounds.forEach((round, roundNumber: number) => {
        const country = round.streakLocationCode;
        const player = item.game.player;
        const guess = player.guesses[roundNumber];
        if (!guess) return;

        // Initialize the country result in the map if it doesn't exist
        if (!resultsByCountry.has(country)) {
          resultsByCountry.set(country, {
            country,
            players: new Map<string, TotalPlayer>(),
          });
        }

        const countryResult = resultsByCountry.get(country)!;
        const playerName = item.playerName;
        const disMeters = Number(guess.distance.meters.amount);
        const score = Number(guess.roundScore.amount);
        const time = guess.time;
        const percentage = guess.roundScore.percentage;
        // Initialize the player in the country if it doesn't exist
        if (!countryResult.players.has(playerName)) {
          countryResult.players.set(playerName, {
            name: playerName,
            totalPoints: score, // Assuming a point system, add actual calculation
            totalTimeSeconds: time,
            totalDistance: disMeters,
            totalPercentage: percentage,
            totalGamesPlayed: 1,
          });
        } else {
          // Update existing player stats
          const p = countryResult.players.get(playerName)!;
          // Update other stats as necessary
          countryResult.players.set(playerName, {
            ...p,
            totalPoints: p.totalPoints + score,
            totalTimeSeconds: p.totalTimeSeconds + time,
            totalDistance: p.totalDistance + disMeters,
            totalPercentage: p.totalPercentage + percentage,
            totalGamesPlayed: p.totalGamesPlayed + 1,
          });
        }
      });
    });
  });

  return resultsByCountry;
};

export const getCountries = () => {
  const resultCountries: CountryData[] = [];

  countries.countries.map((country: any) => {
    const code = Object.keys(country)[0];
    let maxPlayer = "";
    let maxCount = 0;
    country[Object.keys(country)[0]].map((countryPlayer: any) => {
      if (countryPlayer.count > maxCount) {
        maxPlayer = countryPlayer.name;
        maxCount = countryPlayer.count;
      }
    });
    resultCountries.push([code.toUpperCase(), maxPlayer, maxCount]);
  });

  return resultCountries;
};
