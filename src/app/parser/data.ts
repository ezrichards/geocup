import fs from "fs";
import results from "../../../stats/totals.json";
import countries from "../../../stats/countries.json";
import Player from "../types/player";
import { Country, CountryData } from "../types/country";
import { Root } from "../types/json";
import { iso1A2Code } from "@rapideditor/country-coder";

export const getResults = () => {
  const files = fs.readdirSync("games");
  const players = new Map<string, Player>();

  files.forEach((file) => {
    const data: Root = JSON.parse(
      fs.readFileSync(`games/${file}`, { encoding: "utf-8" }),
    );
    const items = data.items;
    //loop over each player
    items.forEach((item) => {
      const rounds = item.game.rounds;
      rounds.forEach((round, roundNumber: number) => {
        const player = item.game.player;
        const guess = player.guesses[roundNumber];
        if (!guess) return;
        const playerName = item.playerName;
        const disMeters = Number(guess.distance.meters.amount);
        const score = Number(guess.roundScore.amount);
        const time = guess.time;
        const percentage = guess.roundScore.percentage;
        // Initialize the player in the map if it doesn't exist
        if (!players.has(playerName)) {
          players.set(playerName, {
            name: playerName,
            totalPoints: score,
            totalTimeSeconds: time,
            totalDistance: disMeters,
            totalPercentage: percentage,
            totalGamesPlayed: 1,
            perfectGames: score === 5000 ? 1 : 0,
          });
        } else {
          // increment player stats
          const p = players.get(playerName)!;
          players.set(playerName, {
            ...p,
            totalPoints: p.totalPoints + score,
            totalTimeSeconds: p.totalTimeSeconds + time,
            totalDistance: p.totalDistance + disMeters,
            totalPercentage: p.totalPercentage + percentage,
            totalGamesPlayed: p.totalGamesPlayed + 1,
            perfectGames: p.perfectGames + (score === 5000 ? 1 : 0),
          });
        }
      });
    });
  });

  return Array.from(players.values());
};

// TODO: rename this type to something less stupid
export type TotalPlayer = {
  name: string;
  totalPoints: number;
  totalCorrectCountryPoints: number;
  totalTimeSeconds: number;
  totalDistance: number;
  totalPercentage: number;
  totalGamesPlayed: number;
};

export type CountryResult = {
  country: string;
  totalPoints: number;
  players: Map<string, TotalPlayer>;
};

export const getResultsByCountry = () => {
  const files = fs.readdirSync("games");
  const resultsByCountry: Map<string, CountryResult> = new Map();

  files.forEach((file) => {
    const data: Root = JSON.parse(
      fs.readFileSync(`games/${file}`, { encoding: "utf-8" }),
    );
    const items = data.items;
    //loop over each player
    items.forEach((item) => {
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
            totalPoints: 0,
            players: new Map<string, TotalPlayer>(),
          });
        }

        const countryResult = resultsByCountry.get(country)!;

        const playerName = item.playerName;
        const disMeters = Number(guess.distance.meters.amount);
        const score = Number(guess.roundScore.amount);
        const time = guess.time;
        const percentage = guess.roundScore.percentage;
        // check if the coordinates are in the country
        // if not the player gets 0 country points
        const correctCountry = iso1A2Code([round.lng, round.lat]);
        const guessCountry = iso1A2Code([guess.lng, guess.lat]);
        const correctCountryPoints =
          correctCountry === guessCountry ? score : 0;

        // add all players points to the country (for sorting countries by total points)
        resultsByCountry.set(country, {
          ...countryResult,
          totalPoints: countryResult.totalPoints + score,
        });

        // Initialize the player in the country if it doesn't exist
        if (!countryResult.players.has(playerName)) {
          countryResult.players.set(playerName, {
            name: playerName,
            totalPoints: score, // Assuming a point system, add actual calculation
            totalCorrectCountryPoints: correctCountryPoints,
            totalTimeSeconds: time,
            totalDistance: disMeters,
            totalPercentage: percentage,
            totalGamesPlayed: 1,
          });
        } else {
          // increment player stats
          const p = countryResult.players.get(playerName)!;
          countryResult.players.set(playerName, {
            ...p,
            totalPoints: p.totalPoints + score,
            totalCorrectCountryPoints:
              p.totalCorrectCountryPoints + correctCountryPoints,
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
