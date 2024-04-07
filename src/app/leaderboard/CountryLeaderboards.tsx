"use client";
import { useState } from "react";
import { CountryResult, TotalPlayer } from "../parser/data";
import "./CountryLeaderboards.scss";
const sortByScore = (avg: boolean) => {
  if (avg) {
    return (
      [, playerA]: [string, TotalPlayer],
      [, playerB]: [string, TotalPlayer]
    ) =>
      playerB.totalPoints / playerB.totalGamesPlayed -
      playerA.totalPoints / playerA.totalGamesPlayed;
  }
  return (
    [, playerA]: [string, TotalPlayer],
    [, playerB]: [string, TotalPlayer]
  ) => playerB.totalPoints - playerA.totalPoints;
};

const countrySort = (
  [, countryA]: [string, CountryResult],
  [, countryB]: [string, CountryResult]
) => countryB.totalPoints - countryA.totalPoints;

export const CountryLeaderboards = ({
  countryResultsArray,
}: {
  countryResultsArray: [string, CountryResult][];
}) => {
  const [isAvg, setIsAvg] = useState<boolean>(true);
  const [focusedCountry, setFocusedCountry] = useState<string | null>(null);
  return (
    <div className="c-country-leaderboard">
      <div className="settings">
        <p>
          Currently showing{" "}
          {isAvg ? "Average Score Leaderboard" : "All Time Leaderboard"}{" "}
          <button onClick={() => setIsAvg((old) => !old)}>
            {isAvg
              ? "Show All Time Leaderboard"
              : "Show Average Score Leaderboard"}
          </button>
        </p>
      </div>
      <div className="flex-grid">
        {countryResultsArray.toSorted(countrySort).map(([country, result]) => (
          <div key={country}>
            <div
              className="card"
              style={
                {
                  "--img-url": `url(https://flagsapi.com/${country.toUpperCase()}/flat/64.png)`,
                } as React.CSSProperties
              }
              onClick={() => {
                setFocusedCountry((old) => (old === country ? null : country));
              }}
            >
              {/* Total points in country{result.totalPoints.toFixed(0)} */}
              <img
                className="image"
                src={`https://flagsapi.com/${country.toUpperCase()}/flat/64.png`}
                alt={`${country} flag`}
              />
              <p>{country.toUpperCase()}</p>
              {Array.from(result.players.entries())
                .toSorted(sortByScore(isAvg))
                .slice(0, focusedCountry === country ? undefined : 3)
                .map(([playerName, player], index) => (
                  <div key={playerName}>
                    {getEmoji(index)} {playerName} -{" "}
                    {isAvg
                      ? (player.totalPoints / player.totalGamesPlayed).toFixed(
                          0
                        )
                      : player.totalPoints.toFixed(0)}
                    {/* {playerName}: Score - {player.totalPoints}, Distance -{" "}
                  {player.totalDistance} meters, Time -{" "}
                  {player.totalTimeSeconds} seconds */}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getEmoji = (index: number) => {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "";
  }
};
