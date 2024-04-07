import fs from "fs";
import results from "../../../stats/totals.json";
import countries from "../../../stats/countries.json";
import Player from "../types/player";
import { CountryData } from "../types/country";

export const getResults = () => {
  const players: Player[] = [];
  const DAYS_PLAYED = fs.readdirSync("games").length - 1;

  results.totals.map((item: any) =>
    players.push({
      name: item.name,
      totalPoints: Number(item.totalScore),
      totalTimeSeconds: Number(item.totalTime),
      percentage:
        String(
          Math.round(Number(item.totalScore / (25000 * DAYS_PLAYED)) * 100),
        ) + "%",
    }),
  );
  return players;
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
