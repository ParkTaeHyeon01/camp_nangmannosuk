import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const regionalData = [
  { region: "서울", count: 42, avgPrice: 58000, avgRating: 4.3, tone: "bg-teal-300" },
  { region: "경기", count: 128, avgPrice: 45000, avgRating: 4.2, tone: "bg-teal-500" },
  { region: "강원", count: 215, avgPrice: 52000, avgRating: 4.5, tone: "bg-teal-700" },
  { region: "충북", count: 98, avgPrice: 38000, avgRating: 4.1, tone: "bg-teal-400" },
  { region: "충남", count: 112, avgPrice: 42000, avgRating: 4.2, tone: "bg-teal-500" },
  { region: "전북", count: 87, avgPrice: 39000, avgRating: 4.0, tone: "bg-teal-400" },
  { region: "전남", count: 134, avgPrice: 41000, avgRating: 4.3, tone: "bg-teal-600" },
  { region: "경북", count: 156, avgPrice: 44000, avgRating: 4.2, tone: "bg-teal-600" },
  { region: "경남", count: 189, avgPrice: 47000, avgRating: 4.4, tone: "bg-teal-700" },
  { region: "제주", count: 78, avgPrice: 68000, avgRating: 4.6, tone: "bg-teal-300" },
];

const visitTrendData = [
  { month: "2025.05", visits: 45200 },
  { month: "2025.06", visits: 58400 },
  { month: "2025.07", visits: 72100 },
  { month: "2025.08", visits: 68900 },
  { month: "2025.09", visits: 52300 },
  { month: "2025.10", visits: 48700 },
  { month: "2025.11", visits: 38200 },
  { month: "2025.12", visits: 31500 },
  { month: "2026.01", visits: 28900 },
  { month: "2026.02", visits: 32400 },
  { month: "2026.03", visits: 41800 },
  { month: "2026.04", visits: 52600 },
];

export function RegionalOverview() {
  return (
    <div className="space-y-5">
      {/* 상단 지역 요약 카드 */}
      <div className="grid grid-cols-5 gap-4">
        {regionalData.slice(0, 5).map((region) => (
          <div
            key={region.region}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="mb-3 text-sm font-medium text-gray-900">
              {region.region}
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">캠핑장 수</div>
                <div className="text-lg font-semibold text-gray-900">
                  {region.count}개
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-500">평균가격</div>
                  <div className="text-sm font-medium text-gray-900">
                    ₩{(region.avgPrice / 1000).toFixed(0)}k
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-xs text-gray-500">평점</div>
                  <div className="text-sm font-medium text-gray-900">
                    {region.avgRating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 2열 영역 */}
      <div className="grid grid-cols-2 gap-5">
        {/* 위치 밀집도 */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              전체 캠핑장 위치 밀집도
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              지역별 캠핑장 분포를 밀집도 색상으로 표시
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="grid grid-cols-4 gap-3">
              {regionalData.map((region) => (
                <div
                  key={region.region}
                  className={`${region.tone} flex min-h-[140px] flex-col justify-between rounded-xl p-3 text-white shadow-sm`}
                >
                  <div className="text-sm font-semibold">{region.region}</div>

                  <div>
                    <div className="text-xs text-white/80">캠핑장 수</div>
                    <div className="text-lg font-bold">{region.count}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-gray-500">낮음</span>
              <div className="h-2 w-24 rounded-full bg-gradient-to-r from-teal-200 via-teal-400 to-teal-700" />
              <span className="text-xs text-gray-500">높음</span>
            </div>
          </div>
        </div>

        {/* 방문 추이 차트 */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              전체 캠핑장 시기별 방문량
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              최근 12개월 전체 방문 추이
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={visitTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString()}회`,
                  "방문량",
                ]}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ fill: "#14b8a6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}