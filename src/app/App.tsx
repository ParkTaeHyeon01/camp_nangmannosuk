import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MainHome } from "./components/MainHome";
import { CampgroundManagement } from "./components/CampgroundManagement";
import { StatisticsAnalysis } from "./components/StatisticsAnalysis";
import { ForecastAnalysis } from "./components/ForecastAnalysis";
import { ReviewManagement } from "./components/ReviewManagement";
import { CampgroundDetail } from "./components/CampgroundDetail";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="mainhome" replace />} />
          <Route path="mainhome" element={<MainHome />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="campground" element={<CampgroundManagement />} />
          <Route path="campground/:id" element={<CampgroundDetail />} />
          <Route path="statistics" element={<StatisticsAnalysis />} />
          <Route path="forecast" element={<ForecastAnalysis />} />
          <Route path="review" element={<ReviewManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}