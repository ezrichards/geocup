import fs from "fs";
import Player from "../types/player";
import { Root } from "../types/json";
import { iso1A2Code } from "@rapideditor/country-coder";

export type PlayerSeries = {
  playerName: string;
  data: {
    day: string;
    score: number;
    totalScore: number;
    time: number;
    distance: number;
    percentage: number;
  }[];
};

export class Aggregator {
  players: Player[] = [];
  playersByDay: PlayerSeries[] = [];
  constructor() {
    const files = fs.readdirSync("games");
    //maps player name to player for easy updates
    const players = new Map<string, Player>();
    //maps player name to player series for easy updates
    const playersByDay = new Map<string, PlayerSeries>();
    files.forEach((file) => {
      const data: Root = JSON.parse(
        fs.readFileSync(`games/${file}`, { encoding: "utf-8" }),
      );
      const items = data.items;
      //loop over each player
      items.forEach((item) => {
        const rounds = item.game.rounds;
        const playerName = item.playerName;

        const overallScore = Number(item.game.player.totalScore.amount);
        const overallTime = item.game.player.totalTime;
        const overallDistance = item.game.player.totalDistanceInMeters;
        const overallPercentage = item.game.player.totalScore.percentage;

        //init player series if it doesn't exist
        if (!playersByDay.has(playerName)) {
          playersByDay.set(playerName, {
            playerName,
            data: [],
          });
        }
        //create player series datapoint
        const playerSeriesData = playersByDay.get(playerName)!.data;

        const dataPoint = {
          day: file.split("-")[0],
          overallScore,
          totalScore:
            overallScore +
            (playerSeriesData[playerSeriesData.length - 1]?.totalScore || 0),
          overallTime,
          distance: overallDistance,
          percentage: overallPercentage,
        };
        //add datapoint to player series
        playersByDay.set(playerName, {
          playerName,
          data: [...playerSeriesData, dataPoint],
        });

        rounds.forEach((round, roundNumber: number) => {
          const player = item.game.player;
          const guess = player.guesses[roundNumber];
          if (!guess) return;
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
    this.players = Array.from(players.values());
    this.playersByDay = Array.from(playersByDay.values());
  }
}
//this is bad and stupid :)
export const getResults = () => {
  const ag = new Aggregator();
  return ag.players;
};

export const getResultsByDay = () => {
  const ag = new Aggregator();
  return ag.playersByDay;
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
