import { useEffect, useState } from "react";
import { Tent, DollarSign, Star, Users, Download } from "lucide-react";
import { 
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar 
} from "recharts";
import { KPICard } from "./KPICard";
import { RegionalOverview } from "./RegionalOverview";

// --- 인터페이스 정의 ---
interface DashboardData {
  total_count: number;
  avg_price: number;
  total_reviews: number;
}

interface RegionalStat {
  region: string;
  avgPrice: number;
  count: number;
  visits: number;
  rating: number;
  reviews: number;
}

export function Dashboard() {
  // --- 상태 관리 ---
  const [stats, setStats] = useState<DashboardData>({ total_count: 0, avg_price: 0, total_reviews: 0 });
  const [regionalData, setRegionalData] = useState<RegionalStat[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 데이터 패칭 ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryRes, regionsRes] = await Promise.all([
          fetch("http://localhost:8000/main/stats/summary"),
          fetch("http://localhost:8000/api/stats/regions")
        ]);

        const summaryData = await summaryRes.json();
        const regionsData = await regionsRes.json();

        setStats(summaryData);
        setRegionalData(regionsData);
      } catch (err) {
        console.error("데이터 로드 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-10 text-center font-semibold text-gray-500">대시보드 데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="p-6 w-full max-w-full mx-auto space-y-8 bg-gray-50 min-h-screen">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">캠핑장 데이터 분석 대시보드</h1>
          <p className="text-sm text-gray-600">전국 캠핑장 운영 현황 및 방문 데이터를 실시간으로 확인하세요</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> 리포트 다운로드
        </button>
      </div>

      {/* 1. KPI 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <KPICard title="총 캠핑장 수" value={stats.total_count.toLocaleString()} icon={Tent} />
        <KPICard title="평균 가격" value={`₩${stats.avg_price.toLocaleString()}`} icon={DollarSign} />
        <KPICard title="총 방문 수" value={stats.total_reviews.toLocaleString()} icon={Users} />
      </div>

      {/* 2. 상세 통계 차트 영역 (StatisticsAnalysis에서 가져온 부분) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="지역별 평균 가격" desc="행정구역별 가격 분포">
          <div className="w-full overflow-x-auto pb-2">
            <div style={{ minWidth: `${regionalData.length * 60}px`, height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="region" interval={0} tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `₩${v / 1000}k`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `₩${v.toLocaleString()}`} />
                  <Bar dataKey="avgPrice" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="지역별 누적 방문량" desc="리뷰 및 방문 수 기반 통계">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v.toLocaleString()}회`} />
              <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* 3. 지도 및 지역 상세 정보 */}
      <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        <RegionalOverview />
      </div>
    </div>
  );
}

// 내부 헬퍼 컴포넌트
function ChartContainer({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      {children}
    </div>
  );
}