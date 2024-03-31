import "./page.scss";
import React from "react";
import Player from "../types/player";
import getResults from "../parser/data";

export const metadata = {
  title: "GeoCup Leaderboard",
};

export default function Home() {
  console.log("DATA:", getResults());

  const sampleData: Player[] = [
    {
      id: 6035953,
      name: "Ethan",
      totalPoints: 24000,
    },
    {
      id: 5389539,
      name: "Shane",
      totalPoints: 23953,
    },
    {
      id: 3941340,
      name: "Sumner",
      totalPoints: 24500,
    },
  ];

  return (
    <>
      <h1>Leaderboard</h1>
      <div className="flex-grid">
        {sampleData.map((player: Player) => (
          <React.Fragment key={player.id}>
            <div className="col">
              <p>{player.name}</p>
            </div>
            <div className="col">
              <p>{player.totalPoints}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
