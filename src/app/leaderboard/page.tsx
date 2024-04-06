import "./page.scss";
import React from "react";
import Player from "../types/player";
import { getCountries, getResults } from "../parser/data";
import Link from "next/link";

import { useReactTable, createColumnHelper } from "@tanstack/react-table";
import { LeaderboardTable } from "./LeaderboardTable";
import { Country } from "../types/country";

export const metadata = {
  title: "GeoCup Leaderboard",
  description: "The GeoCup Leaderboard",
};

export default function Home() {
  const data: Player[] = getResults();
  const countryData: Country[] = getCountries();

  // countryData.map((country: any) => {
  //   const { code } = country;
  //   console.log("LOG:", code)
  // })

  return (
    <div className="p-leaderboard">
      <h1>All Time Leaderboard</h1>
      <LeaderboardTable data={data} />
      <br />
      <Link href="/">Go back to home</Link>

      {countryData.map((country: any) => (
        // TODO provide iterator key here once country code is unique
        <>
          {country[Object.keys(country)[0]].map((countryPlayer: any) => (
            <>
              <img
                src={`https://flagsapi.com/${Object.keys(country)[0].toUpperCase()}/flat/64.png`}
              />
              {countryPlayer.name} <br />
              {countryPlayer.count}
            </>
          ))}
        </>
      ))}
    </div>
  );
}
