import {
  AlertTriangle,
  MapPinned,
  TrendingUp,
  Waves,
  CalendarRange,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const monthlyForecastData = [
  { month: "11월", actual: 118, forecast: null, totalForecast: 118, congestion: 42 },
  { month: "12월", actual: 126, forecast: null, totalForecast: 126, congestion: 46 },
  { month: "1월", actual: 121, forecast: null, totalForecast: 121, congestion: 44 },
  { month: "2월", actual: 135, forecast: null, totalForecast: 135, congestion: 51 },
  { month: "3월", actual: 149, forecast: null, totalForecast: 149, congestion: 58 },
  { month: "4월", actual: 161, forecast: null, totalForecast: 161, congestion: 64 },
  { month: "5월", actual: null, forecast: 168, totalForecast: 168, congestion: 71 },
  { month: "6월", actual: null, forecast: 176, totalForecast: 176, congestion: 76 },
  { month: "7월", actual: null, forecast: 189, totalForecast: 189, congestion: 83 },
];

const congestionForecastData = [
  { period: "5월 1주", congestion: 68, level: "high" },
  { period: "5월 2주", congestion: 72, level: "high" },
  { period: "5월 3주", congestion: 65, level: "medium" },
  { period: "5월 4주", congestion: 58, level: "medium" },
  { period: "6월 1주", congestion: 61, level: "medium" },
  { period: "6월 2주", congestion: 69, level: "high" },
];

const regions = [
  { name: "수도권", share: 34.8, width: "86%", level: "high" },
  { name: "강원권", share: 24.1, width: "71%", level: "medium" },
  { name: "충청권", share: 16.7, width: "58%", level: "medium" },
  { name: "영남권", share: 13.3, width: "52%", level: "low" },
  { name: "호남권", share: 11.1, width: "39%", level: "low" },
];

const forecastRows = [
  {
    period: "5월 1주",
    visits: "42,180",
    accuracy: "93.1%",
    risk: "high",
  },
  {
    period: "5월 2주",
    visits: "45,920",
    accuracy: "92.7%",
    risk: "high",
  },
  {
    period: "5월 3주",
    visits: "38,640",
    accuracy: "91.8%",
    risk: "medium",
  },
  {
    period: "5월 4주",
    visits: "31,870",
    accuracy: "92.2%",
    risk: "low",
  },
];

function Badge({
  level,
}: {
  level: "high" | "medium" | "low";
}) {
  const styles = {
    high: "bg-red-50 text-red-600",
    medium: "bg-amber-50 text-amber-600",
    low: "bg-emerald-50 text-emerald-600",
  };

  const labels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  return (
    <span
      className={`inline-flex min-w-[58px] items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[level]}`}
    >
      {labels[level]}
    </span>
  );
}

function ActualVsForecastChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={monthlyForecastData}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEB" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value) => `${value}k`}
            axisLine={false}
            tickLine={false}
            domain={[100, 200]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "12px",
            }}
            formatter={(value: number | null, name: string) => {
              if (value === null || value === undefined) return ["-", name];
              if (name === "actual") return [`${value}천명`, "실제값"];
              if (name === "forecast") return [`${value}천명`, "예측값"];
              return [`${value}`, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="actual"
            name="actual"
            stroke="#2F80ED"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            name="forecast"
            stroke="#F2994A"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function MonthlyForecastChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={monthlyForecastData}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEB" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value) => `${value}k`}
            axisLine={false}
            tickLine={false}
            domain={[100, 200]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "12px",
            }}
            formatter={(value: number | null) => {
              if (value === null || value === undefined) return ["-"];
              return [`${value}천명`, "예상 방문량"];
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="totalForecast"
            name="예상 방문량 추이"
            stroke="#14B8A6"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CongestionForecastChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={congestionForecastData}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEB" />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`${value}/100`, "혼잡도"]}
          />
          <Bar dataKey="congestion" radius={[6, 6, 0, 0]}>
            {congestionForecastData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.level === "high"
                    ? "#EF4444"
                    : entry.level === "medium"
                    ? "#F59E0B"
                    : "#10B981"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ForecastAnalysis() {
  return (
    <div className="mx-auto max-w-[1440px] p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          예측 분석
        </h1>
        <p className="text-sm text-gray-600">
          캠핑장 방문 예측, 수요 변화, 혼잡 위험도를 기준으로
          운영 의사결정을 지원합니다
        </p>
      </div>

      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Prediction Accuracy
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                Stable
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              92.4%
            </div>
            <p className="mt-3 text-xs font-medium text-emerald-600">
              ▲ 1.8% vs last cycle
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Estimated Visits
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                Next 30 Days
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              184,260
            </div>
            <p className="mt-3 text-xs font-medium text-emerald-600">
              ▲ 12.6% seasonal rise
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Future Congestion
              </span>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                High Risk
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              78 / 100
            </div>
            <p className="mt-3 text-xs font-medium text-red-500">
              Peak weekends in 수도권
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Model Confidence
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                Robust
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              88.7%
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">
              Weather + holiday adjusted
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Actual vs Predicted Visits
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  실제 방문 추이와 향후 예측값을 월별로 비교합니다
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="h-[3px] w-5 rounded-full bg-blue-500" />
                  Actual
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-[3px] w-5 border-t-2 border-dashed border-orange-400" />
                  Forecast
                </div>
              </div>
            </div>

            <ActualVsForecastChart />
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Future Congestion Risk
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    다음 성수기 혼잡 경보 수준
                  </p>
                </div>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>

              <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-amber-400 to-red-500" />
              </div>

              <div className="mb-4 flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                <span className="text-sm font-medium text-gray-700">
                  현재 예측 위험도
                </span>
                <Badge level="high" />
              </div>

              <p className="mb-4 text-sm leading-6 text-gray-600">
                수도권·강원권 주말 예약 집중으로 일부 주요
                캠핑장의 혼잡도 상승이 예측됩니다.
              </p>

              <CongestionForecastChart />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Prediction Quality
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    최근 4주 평균 오차율과 정확도
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-teal-600" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    MAPE
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    7.6%
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    RMSE
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    1,284
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                최근 강수량 변수 반영 후 산악권 캠핑장 예측
                오차가 개선되었습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  시기별 예상 방문량 선 그래프
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  월별 방문량 흐름과 향후 예상 추이를 확인합니다
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </div>

            <MonthlyForecastChart />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Forecast Detail Table
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  기간별 예측치와 운영 우선순위
                </p>
              </div>
              <CalendarRange className="h-5 w-5 text-teal-600" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                      Period
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                      Visits
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                      Acc.
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                      Risk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forecastRows.map((row) => (
                    <tr
                      key={row.period}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-3 text-sm font-semibold text-gray-800">
                        {row.period}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {row.visits}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {row.accuracy}
                      </td>
                      <td className="py-3">
                        <Badge
                          level={
                            row.risk as "high" | "medium" | "low"
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Future Demand by Region
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  지역별 다음 기간 예상 수요와 혼잡 수준
                </p>
              </div>
              <MapPinned className="h-5 w-5 text-teal-600" />
            </div>

            <div className="space-y-4">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="grid grid-cols-[88px_1fr_auto_auto] items-center gap-3"
                >
                  <span className="text-sm font-semibold text-gray-700">
                    {region.name}
                  </span>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                      style={{ width: region.width }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {region.share}%
                  </span>
                  <Badge
                    level={region.level as "high" | "medium" | "low"}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                주요 예측 인사이트
              </h3>
              <BarChart3 className="h-5 w-5 text-teal-600" />
            </div>
            <ul className="space-y-3 text-sm leading-6 text-gray-600">
              <li>
                연휴 직전 주간에 수도권 수요 집중 현상이 가장
                크게 나타납니다.
              </li>
              <li>
                강원권은 날씨 영향도가 높아 예측 변동폭이
                상대적으로 큽니다.
              </li>
              <li>
                비수기 평일은 영남권과 호남권의 분산 수요가
                안정적입니다.
              </li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                운영 권장 액션
              </h3>
              <Waves className="h-5 w-5 text-teal-600" />
            </div>
            <ul className="space-y-3 text-sm leading-6 text-gray-600">
              <li>
                혼잡 고위험 캠핑장은 예약 한도 및 회차 관리를
                선제적으로 조정하세요.
              </li>
              <li>
                중위험 지역은 인력 배치와 시설 점검 일정을 주말
                전으로 앞당기세요.
              </li>
              <li>
                저위험 지역은 프로모션 배너나 리뷰 노출 확대를
                검토할 수 있습니다.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                기준 정보
              </h3>
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                  Forecast Window
                </p>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  2026년 5월 기준 4주 예측
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                  Model Version
                </p>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  v2.4 / Weekly Retraining
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}