import { useEffect, useState } from "react";
import { Tent, DollarSign, Users, Download } from "lucide-react";
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

interface RegionStat {
  region: string;
  count: number;
  avg_price: number;
}

export function Dashboard() {
  // --- 상태 관리 ---
  const [stats, setStats] = useState<DashboardData>({ total_count: 0, avg_price: 0, total_reviews: 0 });
  const [regionalData, setRegionalData] = useState<RegionalStat[]>([]);
  const [mapHtml, setMapHtml] = useState<string>('');
  const [viewMode, setViewMode] = useState<'density' | 'cluster'>('cluster');
  const [loading, setLoading] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [regions, setRegions] = useState<RegionStat[]>([]);

  // --- 지도 전용 패칭 함수 ---
  const fetchMap = async (mode: 'density' | 'cluster') => {
    // 1. 즉시 탭 UI를 변경하고 로딩 상태를 활성화
    setViewMode(mode);
    setIsMapLoading(true);
    setMapHtml(''); // 기존 지도를 비워서 "생성 중" 메시지가 뜨게 함

    try {
      const response = await fetch(`http://localhost:8000/api/map/${mode}`);
      const data = await response.json();

      // 2. 데이터 수신 완료 후 지도 표시
      setMapHtml(data.map_html);
    } catch (err) {
      console.error("지도 로드 실패", err);
    } finally {
      setIsMapLoading(false); // 로딩 종료
    }
  };

  // --- 초기 데이터 패칭 ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryRes, regionsRes] = await Promise.all([
          fetch("http://localhost:8000/main/stats/summary"),
          fetch("http://localhost:8000/api/stats/regions"),
          fetch("http://localhost:8000/main/stats/regions")
            .then((res) => res.json())
            .then((data) => setRegions(data))
            .catch((err) => console.error("지역 데이터 로드 실패:", err))
        ]);

        const summaryData = await summaryRes.json();
        const regionsData = await regionsRes.json();

        setStats(summaryData);
        setRegionalData(regionsData);

        // 초기 지도 로드
        await fetchMap('cluster');
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
      </div>

      {/* 1. KPI 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <KPICard title="총 캠핑장 수" value={stats.total_count.toLocaleString()} icon={Tent} />
        <KPICard title="평균 가격" value={`₩${stats.avg_price.toLocaleString()}`} icon={DollarSign} />
        <KPICard title="총 리뷰 수" value={stats.total_reviews.toLocaleString()} icon={Users} />
      </div>

      {/* 2. 상세 통계 차트 영역 */}
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

      {/* 3. 지도 영역 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">전국 캠핑장 분포 현황</h3>
            <p className="text-xs text-gray-500">
              {viewMode === 'density' ? '지역별 캠핑장 밀도를 확인하세요' : '마커를 클릭하여 상세 위치를 확인하세요'}
            </p>
          </div>

          {/* 모드 전환 버튼 */}
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => fetchMap('density')}
              disabled={isMapLoading} // 로딩 중 클릭 방지
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'density'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                } ${isMapLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              📊 지역별 밀도
            </button>
            <button
              onClick={() => fetchMap('cluster')}
              disabled={isMapLoading}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'cluster'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                } ${isMapLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              📍 캠핑장 묶어보기
            </button>
          </div>
        </div>

        <div className="w-full h-[700px] rounded-lg overflow-hidden border relative mb-2">
          {/* 지도가 있더라도 로딩 중이면 스피너나 메시지를 덮어씌움 */}
          {(!mapHtml || isMapLoading) ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 z-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
              <p className="text-sm font-medium text-gray-500 animate-pulse">
                {viewMode === 'density' ? '밀도 지도를 생성 중입니다...' : '캠핑장 데이터를 불러오고 있습니다...'}
              </p>
            </div>
          ) : null}

          {mapHtml && (
            <iframe
              srcDoc={mapHtml}
              className="w-full h-full border-none"
              title="Camping Map"
            />
          )}
        </div>

        {/* 1. 상단 지역 요약 카드 (전체 너비 사용) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {regions.map((r) => (
            <div key={r.region} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-medium mb-2 text-gray-500">{r.region}</div>
              <div className="text-lg font-bold text-gray-900">{r.count.toLocaleString()}개</div>
              <div className="text-xs text-gray-400">평균 ₩{(r.avg_price / 1000).toFixed(0)}k</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 지역 상세 정보 하단 섹션 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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