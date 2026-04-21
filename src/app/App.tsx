import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CampgroundManagement } from "./components/CampgroundManagement";
import { CampgroundDetail } from "./components/CampgroundDetail";
import { ForecastAnalysis } from "./components/ForecastAnalysis";
import { MainHome } from "./components/MainHome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/forecast" element={<ForecastAnalysis />} />
        <Route path="/campground/:id" element={<CampgroundDetail />} />
      </Routes>
    </BrowserRouter>
  );
}