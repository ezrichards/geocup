import "./page.scss";
import React from "react";
import Player from "../types/player";
import { getResults, getResultsByCountry } from "../parser/data";
import { LeaderboardTable } from "./LeaderboardTable";
import Header from "@/components/Header";
import { CountryLeaderboards } from "./CountryLeaderboards";
export const metadata = {
  title: "GeoCup Leaderboard",
  description: "The GeoCup Leaderboard",
};

export default function Home() {
  const data: Player[] = getResults();

  const countryResults = getResultsByCountry();
  const countryResultsArray = Array.from(countryResults.entries());
  return (
    <>
      <div className="p-leaderboard">
        <Header />

        <h1>All Time Leaderboard</h1>
        <LeaderboardTable data={data} />

        <h1>Country Leaderboard</h1>
        <CountryLeaderboards countryResultsArray={countryResultsArray} />
      </div>
    </>
  );
}
