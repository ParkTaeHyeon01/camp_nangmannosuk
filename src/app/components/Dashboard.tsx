import { Tent, DollarSign, Star, Users } from "lucide-react";
import { KPICard } from "./KPICard";
import { RegionalOverview } from "./RegionalOverview";

export function Dashboard() {
  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          캠핑장 데이터 분석 대시보드
        </h1>
        <p className="text-sm text-gray-600">
          전국 캠핑장 운영 현황, 가격, 평점, 방문 데이터를 한눈에 확인하세요
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <KPICard
            title="총 캠핑장 수"
            value="1,239"
            change={5.2}
            icon={Tent}
            description="지난 달 대비"
          />
          <KPICard
            title="평균 가격"
            value="₩47,500"
            change={2.8}
            icon={DollarSign}
            description="지난 달 대비"
          />
          <KPICard
            title="평균 평점"
            value="4.3"
            change={1.5}
            icon={Star}
            description="지난 달 대비"
          />
          <KPICard
            title="총 방문 수"
            value="52,600"
            change={8.4}
            icon={Users}
            description="지난 달 대비"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            지역별 현황 및 방문 추이
          </h2>
          <p className="text-sm text-gray-600">
            전국 캠핑장 지역 분포 및 최근 방문 트렌드
          </p>
        </div>
        <RegionalOverview />
      </div>
    </div>
  );
}