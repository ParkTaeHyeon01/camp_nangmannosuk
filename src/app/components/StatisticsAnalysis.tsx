import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Download } from "lucide-react";

// 데이터 정의
const regionalPriceData = [
  { region: "서울", avgPrice: 85000, count: 12 },
  { region: "경기", avgPrice: 72000, count: 45 },
  { region: "강원", avgPrice: 68000, count: 32 },
];

const regionalVisitData = [
  { region: "서울", visits: 12450 },
  { region: "경기", visits: 28560 },
  { region: "강원", visits: 39210 },
];

const regionalRatingData = [
  { region: "서울", rating: 4.2, reviews: 850 },
  { region: "경기", rating: 4.5, reviews: 2100 },
  { region: "강원", rating: 4.7, reviews: 1450 },
];

const campgroundPriceData = [
  { campground: "난지", price: 85000 },
  { campground: "자라섬", price: 72000 },
  { campground: "양양", price: 68000 },
];

const campgroundVisitData = [
  { campground: "난지", visits: 12450 },
  { campground: "자라섬", visits: 28560 },
  { campground: "양양", visits: 39210 },
];

const seasonalTrendData = [
  { month: "1월", 일반캠핑: 12000, 오토캠핑: 8500, 글램핑: 4500, 카라반: 3200 },
  { month: "2월", 일반캠핑: 11500, 오토캠핑: 8200, 글램핑: 4800, 카라반: 3100 },
  { month: "3월", 일반캠핑: 13000, 오토캠핑: 9000, 글램핑: 5200, 카라반: 3500 },
];

export function StatisticsAnalysis() {
  const [dateRange, setDateRange] = useState("12months");
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const totalCampgrounds = regionalPriceData.reduce((sum, item) => sum + item.count, 0);
  const avgPriceOverall = Math.round(
    regionalPriceData.reduce((sum, item) => sum + item.avgPrice * item.count, 0) / totalCampgrounds
  );
  const totalVisits = regionalVisitData.reduce((sum, item) => sum + item.visits, 0);
  const avgRatingOverall = (
    regionalRatingData.reduce((sum, item) => sum + item.rating * item.reviews, 0) /
    regionalRatingData.reduce((sum, item) => sum + item.reviews, 0)
  ).toFixed(1);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">통계 분석</h1>
            <p className="text-sm text-gray-600">전국 캠핑장 데이터 비교 분석 및 트렌드</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            리포트 다운로드
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">총 캠핑장 수</h3>
          <div className="text-2xl font-bold text-gray-900">{totalCampgrounds}개</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">평균 가격</h3>
          <div className="text-2xl font-bold text-gray-900">₩{avgPriceOverall.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">총 방문량</h3>
          <div className="text-2xl font-bold text-gray-900">{totalVisits.toLocaleString()}회</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">평균 평점</h3>
          <div className="text-2xl font-bold text-gray-900">{avgRatingOverall}점</div>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">필터</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="12months">12개월</option>
            <option value="6months">6개월</option>
          </select>
        </div>
      </div>

      {/* 차트들 */}
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          {/* 캠핑장별 가격 막대그래프 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">캠핑장별 가격 막대그래프</h3>
            <p className="text-xs text-gray-600 mb-4">캠핑장별 1박 기준 가격 비교</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={campgroundPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="campground" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#6b7280" }} 
                  tickFormatter={(v) => `₩${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }} 
                  formatter={(value: number) => [`₩${value.toLocaleString()}`, "가격"]}
                />
                <Bar dataKey="price" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 지역별 가격 평균 차트 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">지역별 가격 평균 차트</h3>
            <p className="text-xs text-gray-600 mb-4">지역별 평균 요금 비교</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={regionalPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="region" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#6b7280" }} 
                  tickFormatter={(v) => `₩${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }} 
                  formatter={(value: number) => [`₩${value.toLocaleString()}`, "평균 가격"]}
                />
                <Bar dataKey="avgPrice" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* 캠핑장별 방문량 막대그래프 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">캠핑장별 방문량 막대그래프</h3>
            <p className="text-xs text-gray-600 mb-4">캠핑장별 누적 방문량 비교</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={campgroundVisitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="campground" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#6b7280" }} 
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }} 
                  formatter={(value: number) => [`${value.toLocaleString()}회`, "방문량"]}
                />
                <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 시기별 방문량 선 그래프 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">시기별 캠핑장별 방문량 선 그래프</h3>
            <p className="text-xs text-gray-600 mb-4">월별 캠핑장 방문 추이</p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={seasonalTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 11, fill: "#6b7280" }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#6b7280" }} 
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="일반캠핑" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="오토캠핑" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="글램핑" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="카라반" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}