import Link from "next/link";
import "./page.scss";
import React from "react";

export default function Home() {
  return (
    <main className="p-home">
      <h1>GeoCup</h1>
      <div className="welcome">
        <p>
          Welcome to GeoCup! The rules are simple: over the course of April
          2024, we'll play a game of GeoGuessr every day. Everyone is welcome
          and a challenge link will be available on this page every day, as well
          as links from previous days.
        </p>
        <p>
          <strong>
            Results will be uploaded to the site around 9:00 PM MST every day.
          </strong>{" "}
          You can still play afterwards, you just may not show up on the live
          <Link href="/leaderboard"> leaderboard</Link>.
        </p>
      </div>
    </main>
  );
}
