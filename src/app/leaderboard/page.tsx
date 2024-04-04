import "./page.scss";
import React from "react";
import Player from "../types/player";
import getResults from "../parser/data";
import Link from "next/link";

import { useReactTable, createColumnHelper } from "@tanstack/react-table";
import { LeaderboardTable } from "./LeaderboardTable";
export const metadata = {
  title: "GeoCup Leaderboard",
  description: "The GeoCup Leaderboard",
};

export default function Home() {
  const data: Player[] = getResults();
  return (
    <div className="p-leaderboard">
      <h1>All Time Leaderboard</h1>
      <LeaderboardTable data={data} />
      <br />
      <Link href="/">Go back to home</Link>
    </div>
  );
}
