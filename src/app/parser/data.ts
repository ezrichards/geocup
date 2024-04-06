import fs from "fs";
import results from "../../../stats/totals.json";
import countries from "../../../stats/countries.json";
import Player from "../types/player";
import { Country } from "../types/country";

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

// TODO structure countries better
export const getCountries = () => {
  const resultCountries: Country[] = [];

  // TODO fix any type
  countries.countries.map((country: any) => {
    // console.log(country)

    // const code = Object.keys(country)[0];
    // console.log("CODE", code)

    // TODO filter top person per country and put return as array of
    // [ [code, player, count] ] ?

    resultCountries.push(country);
  });

  return resultCountries;
};
