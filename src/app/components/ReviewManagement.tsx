import React from "react";

// --- [공통 컴포넌트: 차트 이미지 카드] ---
// 이미지 내부에 제목과 범례가 포함되어 있으므로, 프론트엔드에서는 이미지만 깔끔하게 렌더링합니다.
function ChartImageCard({ 
  src, 
  alt 
}: { 
  src: string; 
  alt: string; 
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-[420px] w-full items-center justify-center bg-white p-2">
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Chart+Load+Failed";
          }}
        />
      </div>
    </div>
  );
}

export function ReviewManagement() {
  // --- [API 연결 설정] ---
  // 백엔드에서 FileResponse로 이미지를 반환하므로 쿼리 파라미터를 포함한 URL을 직접 사용합니다.
  const API_BASE_URL = "http://localhost:8000/api/stats";

  const chartUrls = {
    regionPos: `${API_BASE_URL}/regions/sentiment-image?sentiment=pos`,
    regionNeg: `${API_BASE_URL}/regions/sentiment-image?sentiment=neg`,
    seasonalPos: `${API_BASE_URL}/seasonal/sentiment-image?sentiment=pos`,
    seasonalNeg: `${API_BASE_URL}/seasonal/sentiment-image?sentiment=neg`,
  };

  return (
    <div className="mx-auto max-w-[1440px] p-6">
      {/* 헤더 섹션 */}
      <header className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">리뷰 통계 분석 리포트</h1>
        <p className="mt-1 text-sm text-gray-500">지역 및 계절별 긍정/부정 리뷰 분포 시각화 자료입니다.</p>
      </header>

      <div className="space-y-12">
        {/* 지역별 분석 이미지 섹션 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 ml-1">지역별 통계</h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ChartImageCard src={chartUrls.regionPos} alt="지역별 긍정 리뷰 분포" />
            <ChartImageCard src={chartUrls.regionNeg} alt="지역별 부정 리뷰 분포" />
          </div>
        </section>

        {/* 계절별 분석 이미지 섹션 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 ml-1">시즌별 트렌드</h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ChartImageCard src={chartUrls.seasonalPos} alt="계절별 긍정 리뷰 분포" />
            <ChartImageCard src={chartUrls.seasonalNeg} alt="계절별 부정 리뷰 분포" />
          </div>
        </section>
      </div>
    </div>
  );
}