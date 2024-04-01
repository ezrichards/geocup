import fs from "fs";
import Link from "next/link";
import "./page.scss";
import React from "react";
import Day from "./types/day";

export const metadata = {
  title: "GeoCup",
};

export default function Home() {
  const games: Day[] = [];

  fs.readdirSync("games").forEach((file, index) => {
    games.push({
      code: file.split("-")[1].split(".")[0],
      day: index + 1,
    });
  });

  return (
    <main className="p-home">
      <h1>GeoCup</h1>
      <div className="welcome">
        <p>
          Welcome to GeoCup! The rules are simple: over the course of April
          2024, we'll play a game of GeoGuessr every day (move, pan, zoom
          allowed with 2 min round time limit). Everyone is welcome and a
          challenge link will be available on this page every day, as well as
          links from previous days.
        </p>
        <p>
          <strong>
            Results will be uploaded to the site around 9:00 PM MST every day.
          </strong>{" "}
          You can still play afterwards, you just may not show up on the live
          <Link href="/leaderboard"> leaderboard</Link>.
        </p>
        <p>
          This site is still under construction! Send me a message on Discord @{" "}
          <strong>ethanzr</strong> with any feedback or bugs.
        </p>
        {games.reverse().map((game) => (
          <p>
            <strong>
              Day {game.day} (4/{game.day}/24):{" "}
            </strong>{" "}
            <a
              target="_blank"
              href={`https://www.geoguessr.com/challenge/${game.code}`}
            >
              https://www.geoguessr.com/challenge/{game.code}
            </a>
          </p>
        ))}
      </div>
    </main>
  );
}
