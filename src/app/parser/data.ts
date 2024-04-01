import fs from "fs";
import results from "../../../games/apr1-VNW0sppUUiYr0xmz.json";
import Player from "../types/player";

const getResults = () => {
  const players: Player[] = [];

  // fs.readdirSync("games").forEach((file) => {
  //   const results = import(`../../../games/${file}`);
  //   console.log(results);
  // });

  // TODO fix this any type
  results.items.map((item: any) =>
    players.push({
      id: item.userId,
      name: item.playerName,
      totalPoints: Number(item.game.player.totalScore.amount),
      totalTimeSeconds: Number(item.game.player.totalTime),
      percentage: Number(item.game.player.totalScore.percentage),
    }),
  );
  return players;
};

export default getResults;
