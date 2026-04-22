import { useEffect, useState } from "react";

export function RegionalOverview() {
  return (
    <div className="space-y-6">

      {/* 2. 하단 그래프 섹션 (밀집도를 제거하고 전체 너비 12열을 모두 사용) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col min-h-[650px]">
          <h3 className="text-base font-bold mb-5 text-gray-800">전체 캠핑장 시기별 리뷰양</h3>

          <div className="flex-1 w-full bg-slate-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <img
              src={`http://localhost:8000/main/stats/visit-trend?t=${Date.now()}`}
              alt="리뷰 추이 그래프"
              /* object-fill과 w-full, h-full로 확장된 영역에 그래프를 꽉 채움 */
              className="w-full h-full object-fill p-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/1600x800?text=Graph+Loading...";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}