import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/Home";
import LeaderboardPage from "./pages/leaderboard/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
