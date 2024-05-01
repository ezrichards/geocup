import fs from "fs";
import Link from "next/link";
import "./page.scss";
import React from "react";
import Day from "./types/day";
import Header from "@/components/Header";

export const metadata = {
  title: "GeoCup",
  description: "A mini GeoGuessr tournament held in April!",
};

export default function Home() {
  const games: Day[] = [];

  var daysPlayed = 1;
  fs.readdirSync("games").forEach((file) => {
    if (file.includes("-")) {
      games.push({
        code: file.split("-")[1].split(".")[0],
        day: daysPlayed,
      });
      daysPlayed++;
    }
  });

  return (
    <main className="p-home">
      <Header />

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
          <strong>GeoCup is now over! Thanks for playing. :)</strong> See who
          won on the
          <Link href="/leaderboard"> leaderboard</Link>.
        </p>
        {games.reverse().map((game) => (
          <p key={game.code}>
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
