import { useState, useEffect } from "react";
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

interface RegionalStat {
  region: string;
  avgPrice: number;
  count: number;
  visits: number;
  rating: number;
  reviews: number;
}

export function StatisticsAnalysis() {
  // --- 상태 관리 ---
  const [regionalData, setRegionalData] = useState<RegionalStat[]>([]);
  const [topCampgrounds, setTopCampgrounds] = useState<any[]>([]);
  const [seasonalTrend, setSeasonalTrend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- API 데이터 호출 ---
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        // 병렬로 API 호출 수행
        const [regRes, topRes, trendRes] = await Promise.all([
          fetch("http://localhost:8000/api/stats/regions"),
          fetch("http://localhost:8000/api/stats/campgrounds/top?limit=5"),
          fetch("http://localhost:8000/api/stats/seasonal-trend")
        ]);

        const regData = await regRes.json();
        const topData = await topRes.json();
        const trendData = await trendRes.json();

        setRegionalData(regData);
        setTopCampgrounds(topData);
        setSeasonalTrend(trendData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  // --- KPI 계산 (이미지 로직 적용) ---

  const totalCampgrounds = regionalData.reduce((sum, item) => sum + item.count, 0);

  const avgPriceOverall = totalCampgrounds > 0
    ? Math.round(regionalData.reduce((sum, item) => sum + item.avgPrice * item.count, 0) / totalCampgrounds)
    : 0;

  const totalVisits = regionalData.reduce((sum, item) => sum + item.visits, 0);
  const totalReviews = regionalData.reduce((sum, item) => sum + item.reviews, 0);

  const avgRatingOverall = totalReviews > 0
    ? (regionalData.reduce((sum, item) => sum + item.rating * item.reviews, 0) / totalReviews).toFixed(1)
    : "0.0";

  if (loading) {
    return <div className="p-10 text-center font-semibold">통계 데이터를 분석 중입니다...</div>;
  }

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">통계 분석</h1>
          <p className="text-sm text-gray-600">서버 실시간 수집 데이터 기반 비교 분석</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Download className="w-4 h-4" /> 리포트 다운로드
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "총 캠핑장 수", value: `${totalCampgrounds.toLocaleString()}개` },
          { label: "평균 가격", value: `₩${avgPriceOverall.toLocaleString()}` },
          { label: "총 방문량", value: `${totalVisits.toLocaleString()}회` },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">{kpi.label}</h3>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* 차트 그리드 */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">

          {/* 지역별 평균 가격 부분 수정 */}
          <ChartContainer title="지역별 평균 가격" desc="행정구역별 데이터">
            <div className="w-full overflow-x-auto pb-4">
              <div style={{ minWidth: `${regionalData.length * 80}px`, height: "350px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="region"
                      interval={0} // 모든 지역 이름 강제 표시
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tickFormatter={(v) => `₩${v / 1000}k`} />
                    <Tooltip formatter={(v: number) => `₩${v.toLocaleString()}`} />
                    <Bar
                      dataKey="avgPrice"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      barSize={40} // 막대 두께 고정
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 지역별 누적 방문량 */}
          <ChartContainer title="지역별 누적 방문량" desc="리뷰 수 기반 통계">
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `${v.toLocaleString()}회`} />
              <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

// 공통 차트 레이아웃 컴포넌트
function ChartContainer({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-600 mb-4">{desc}</p>
      <ResponsiveContainer width="100%" height={320}>
        {children as any}
      </ResponsiveContainer>
    </div>
  );
}