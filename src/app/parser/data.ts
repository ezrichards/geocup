import fs from "fs";
import results from "../../../stats/totals.json";
import countries from "../../../stats/countries.json";
import Player from "../types/player";
import { Country, CountryData } from "../types/country";

export const getResults = () => {
  const players: Player[] = [];

  // fs.readdirSync("games").forEach((file) => {
  //   const results = import(`../../../games/${file}`);
  //   console.log(results);
  // });

  // TODO fix this any type
  results.totals.map((item: any) =>
    players.push({
      name: item.name,
      totalPoints: Number(item.totalScore),
      totalTimeSeconds: Number(item.totalTime),
      percentage: Number(0),
      // id: item.userId,
      // name: item.playerName,
      // totalPoints: Number(item.game.player.totalScore.amount),
      // totalTimeSeconds: Number(item.game.player.totalTime),
      // percentage: Number(item.game.player.totalScore.percentage),
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
