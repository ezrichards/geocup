import { TotalPlayer, getResultsByCountry } from "../parser/data";

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

export const CountryLeaderboards = () => {
  const countryResults = getResultsByCountry();
  const countryResultsArray = Array.from(countryResults.entries());
  return (
    <div className="c-country-leaderboard flex-grid">
      {countryResultsArray.map(([country, result]) => (
        <div key={country}>
          <div className="col">
            <img
              className="image"
              src={`https://flagsapi.com/${country.toUpperCase()}/flat/64.png`}
              alt={`${country} flag`}
            />
            <p>{country}</p>
            {Array.from(result.players.entries())
              .toSorted(sortByScore(true))
              .map(([playerName, player], index) => (
                <div key={playerName}>
                  {getEmoji(index)} {playerName}
                  {/* {playerName}: Score - {player.totalPoints}, Distance -{" "}
                  {player.totalDistance} meters, Time -{" "}
                  {player.totalTimeSeconds} seconds */}
                </div>
              ))}
          </div>
        </div>
      ))}
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
