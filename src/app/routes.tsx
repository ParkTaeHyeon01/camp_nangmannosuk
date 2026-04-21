import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { MainHome } from "./components/MainHome";
import { Dashboard } from "./components/Dashboard";
import { CampgroundManagement } from "./components/CampgroundManagement";
import { CampgroundDetail } from "./components/CampgroundDetail";
import { StatisticsAnalysis } from "./components/StatisticsAnalysis";
import { ForecastAnalysis } from "./components/ForecastAnalysis";
import { ReviewManagement } from "./components/ReviewManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: MainHome },
      { path: "dashboard", Component: Dashboard },
      { path: "campground", Component: CampgroundManagement },
      { path: "campground/:id", Component: CampgroundDetail },
      { path: "statistics", Component: StatisticsAnalysis },
      { path: "forecast", Component: ForecastAnalysis },
      { path: "review", Component: ReviewManagement },
    ],
  },
]);