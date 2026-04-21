import { useEffect, useState } from "react";
import { Tent, DollarSign, Star, Users } from "lucide-react";
import { KPICard } from "./KPICard";
import { RegionalOverview } from "./RegionalOverview";

interface DashboardData {
  total_count: number;
  avg_price: number;
  total_reviews: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardData>({ total_count: 0, avg_price: 0, total_reviews: 0 });

  useEffect(() => {
    fetch("http://localhost:8000/main/stats/summary")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("KPI 로드 실패", err));
  }, []);

  return (
    // max-w-full을 사용하여 화면 좌우를 가득 채웁니다.
    <div className="p-6 w-full max-w-full mx-auto space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">캠핑장 데이터 분석 대시보드</h1>
        <p className="text-sm text-gray-600">전국 캠핑장 운영 현황 및 방문 데이터를 실시간으로 확인하세요</p>
      </div>

      {/* 상단 KPI 영역: 불필요한 속성 제거 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <KPICard 
          title="총 캠핑장 수" 
          value={stats.total_count.toLocaleString()} 
          icon={Tent} 
        />
        <KPICard 
          title="평균 가격" 
          value={`₩${stats.avg_price.toLocaleString()}`} 
          icon={DollarSign} 
        />
        <KPICard 
          title="총 방문 수" 
          value={stats.total_reviews.toLocaleString()} 
          icon={Users} 
        />
        <KPICard 
          title="평균 평점" 
          value="4.3" 
          icon={Star} 
        />
      </div>

      <RegionalOverview />
    </div>
  );
}