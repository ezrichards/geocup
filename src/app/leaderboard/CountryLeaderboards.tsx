"use client";
import { useState } from "react";
import { CountryResult, TotalPlayer } from "../parser/data";
import "./CountryLeaderboards.scss";
import { emojiFlag } from "@rapideditor/country-coder";

const countrySort = (
  [, countryA]: [string, CountryResult],
  [, countryB]: [string, CountryResult],
) => countryB.totalPoints - countryA.totalPoints;

export const CountryLeaderboards = ({
  countryResultsArray,
}: {
  countryResultsArray: [string, CountryResult][];
}) => {
  const [isAvg, setIsAvg] = useState<boolean>(true);
  const [isStrictCountry, setIsStrictCountry] = useState<boolean>(true);
  const [focusedCountry, setFocusedCountry] = useState<string | null>(null);
  //function for calculating the player's score based on state
  const getPlayerPoints = (player: TotalPlayer): number => {
    const totalPoints = isStrictCountry
      ? player.totalCorrectCountryPoints
      : player.totalPoints;
    const scoreValue = isAvg
      ? totalPoints / player.totalGamesPlayed
      : totalPoints;
    return scoreValue;
  };
  const sortByScore = (avg: boolean) => {
    return (
      [, playerA]: [string, TotalPlayer],
      [, playerB]: [string, TotalPlayer],
    ) => getPlayerPoints(playerB) - getPlayerPoints(playerA);
  };

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
        <p>
          {isStrictCountry
            ? "Counting incorrect country guesses as 0 points"
            : "Counting all guesses"}{" "}
          <button onClick={() => setIsStrictCountry((old) => !old)}>
            {isStrictCountry
              ? "Count All Guesses"
              : "Count Incorrect Country Guesses as 0 Points"}
          </button>
        </p>
      </div>
      <div className="flex-grid">
        {countryResultsArray.toSorted(countrySort).map(([country, result]) => (
          <div key={country}>
            <div
              className="card"
              onClick={() => {
                setFocusedCountry((old) => (old === country ? null : country));
              }}
            >
              <div className="bg-image">{emojiFlag(country)}</div>

              {/* Total points in country{result.totalPoints.toFixed(0)} */}
              <div className="country-img">
                <div className="dummy"></div>
                <div className="flag-image">{emojiFlag(country)}</div>
                <p className="country-code">{country.toUpperCase()}</p>
              </div>
              <div className="mini-leaderboard">
                {Array.from(result.players.entries())
                  .toSorted(sortByScore(isAvg))
                  .slice(0, focusedCountry === country ? undefined : 3)
                  .map(([playerName, player], index) => {
                    const pointsDisplay = getPlayerPoints(player);
                    if (pointsDisplay === 0) return null;
                    return (
                      <div className="podium-winner" key={playerName}>
                        <div className="emoji">{getEmoji(index)}</div>
                        <div className="player">{playerName}</div>
                        <div className="score">{pointsDisplay.toFixed(0)}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getEmoji = (index: number): string => {
  const emojis = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
  if (index < emojis.length) return emojis[index];
  return "💀";
};
