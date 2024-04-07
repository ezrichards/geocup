import "./page.scss";
import React from "react";
import Player from "../types/player";
import { getCountries, getResults, getResultsByCountry } from "../parser/data";
import { LeaderboardTable } from "./LeaderboardTable";
import { CountryData } from "../types/country";
import Header from "@/components/Header";
import { CountryLeaderboards } from "./CountryLeaderboards";
export const metadata = {
  title: "GeoCup Leaderboard",
  description: "The GeoCup Leaderboard",
};

export default function Home() {
  const data: Player[] = getResults();
  const countryData: CountryData[] = getCountries();
  return (
    <>
      <div className="p-leaderboard">
        <Header />

        <h1>All Time Leaderboard</h1>
        <LeaderboardTable data={data} />

        <h1>Country Leaderboard</h1>
        <CountryLeaderboards />
        {/* <div className="flex-grid">
          {countryData.map((country: any) => (
            <div className="col" key={country[0]}>
              <img
                className="image"
                src={`https://flagsapi.com/${country[0]}/flat/64.png`}
                alt={`${country[0]} flag`}
              />
              <p>{country[0]}</p>
              <p>
                <strong>{country[1]}</strong>: {country[2]}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
