import "./page.scss";
import React from "react";
import Player from "../types/player";
import {
  getResults,
  getResultsByCountry,
  getResultsByDay,
} from "../parser/data";
import { LeaderboardTable } from "./LeaderboardTable";
// import Header from "@/components/Header";
import { CountryLeaderboards } from "./CountryLeaderboards";
import dynamic from "next/dynamic";
// import { Chart } from "./Chart";
const Chart = dynamic(() => import("./Chart"), { ssr: false });

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
        <h1>All Time Leaderboard</h1>
        <LeaderboardTable data={data} />
        <Chart data={getResultsByDay()} />
        <h1>Country Leaderboard</h1>
        <CountryLeaderboards countryResultsArray={countryResultsArray} />
      </div>
    </>
  );
}
