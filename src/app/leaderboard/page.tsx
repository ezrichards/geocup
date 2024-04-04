import "./page.scss";
import React from "react";
import Player from "../types/player";
import getResults from "../parser/data";
import Link from "next/link";

export const metadata = {
  title: "GeoCup Leaderboard",
  description: "The GeoCup Leaderboard",
};

export default function Home() {
  const data: Player[] = getResults();

  return (
    <div className="p-leaderboard">
      <h1>All Time Leaderboard</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Total Points</th>
            <th>Total Time (sec)</th>
            {/* <th>% Accuracy</th> */}
          </tr>
          {data.map((player: Player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.totalPoints}</td>
              <td>{player.totalTimeSeconds}</td>
              {/* <td>{player.percentage}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <Link href="/">Go back to home</Link>
      {/* <div className="flex-grid"> */}
      {/* </div> */}
    </div>
  );
}
