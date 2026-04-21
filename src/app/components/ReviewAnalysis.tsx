import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const reviewTrendData = [
  { month: "2025.10", positive: 78, negative: 22 },
  { month: "2025.11", positive: 82, negative: 18 },
  { month: "2025.12", positive: 76, negative: 24 },
  { month: "2026.01", positive: 79, negative: 21 },
  { month: "2026.02", positive: 85, negative: 15 },
  { month: "2026.03", positive: 81, negative: 19 },
  { month: "2026.04", positive: 83, negative: 17 },
];

const positiveKeywords = [
  { word: "깨끗한 시설", count: 1247 },
  { word: "친절한 직원", count: 1089 },
  { word: "좋은 뷰", count: 1456 },
  { word: "편리한 위치", count: 892 },
  { word: "조용한 환경", count: 1134 },
];

const negativeKeywords = [
  { word: "비싼 가격", count: 456 },
  { word: "불편한 화장실", count: 389 },
  { word: "시끄러운 소음", count: 312 },
  { word: "부족한 시설", count: 267 },
  { word: "접근성 불편", count: 234 },
];

const positiveWordCloud = [
  { word: "자연", size: 48 },
  { word: "깨끗", size: 42 },
  { word: "편안", size: 38 },
  { word: "친절", size: 36 },
  { word: "조용", size: 32 },
  { word: "경치", size: 44 },
  { word: "시설", size: 40 },
  { word: "최고", size: 35 },
  { word: "만족", size: 38 },
  { word: "추천", size: 36 },
  { word: "힐링", size: 32 },
  { word: "완벽", size: 30 },
  { word: "좋음", size: 34 },
  { word: "쾌적", size: 28 },
];

const negativeWordCloud = [
  { word: "비싸다", size: 36 },
  { word: "불편", size: 32 },
  { word: "시끄러움", size: 30 },
  { word: "부족", size: 28 },
  { word: "멀다", size: 26 },
  { word: "낡음", size: 24 },
  { word: "더럽다", size: 28 },
  { word: "불친절", size: 26 },
  { word: "아쉬움", size: 24 },
  { word: "개선필요", size: 22 },
];

export function ReviewAnalysis() {
  const currentPositiveRatio = 83;
  const currentNegativeRatio = 17;

  return (
    <div className="space-y-5">
      {/* Review Ratios and Trend */}
      <div className="grid grid-cols-3 gap-5">
        {/* Positive Ratio */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ThumbsUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">긍정 리뷰 비율</h3>
          </div>
          <div className="mb-3">
            <div className="text-3xl font-bold text-emerald-600">{currentPositiveRatio}%</div>
            <div className="text-xs text-gray-500 mt-1">전월 대비 +2%p</div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${currentPositiveRatio}%` }}
            ></div>
          </div>
        </div>

        {/* Negative Ratio */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <ThumbsDown className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">부정 리뷰 비율</h3>
          </div>
          <div className="mb-3">
            <div className="text-3xl font-bold text-red-600">{currentNegativeRatio}%</div>
            <div className="text-xs text-gray-500 mt-1">전월 대비 -2%p</div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${currentNegativeRatio}%` }}
            ></div>
          </div>
        </div>

        {/* Review Trend Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">리뷰 감성 추이</h3>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={reviewTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10, fill: "#6b7280" }}
                angle={-45}
                textAnchor="end"
                height={40}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "11px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keywords and Word Clouds */}
      <div className="grid grid-cols-2 gap-5">
        {/* Positive Keywords */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">긍정 키워드 TOP 5</h3>
          <div className="space-y-3">
            {positiveKeywords.map((keyword, index) => (
              <div key={keyword.word} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-emerald-700">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{keyword.word}</span>
                    <span className="text-sm text-gray-600">{keyword.count}회</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(keyword.count / 1456) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Negative Keywords */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">부정 키워드 TOP 5</h3>
          <div className="space-y-3">
            {negativeKeywords.map((keyword, index) => (
              <div key={keyword.word} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-red-700">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{keyword.word}</span>
                    <span className="text-sm text-gray-600">{keyword.count}회</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(keyword.count / 456) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Word Clouds */}
      <div className="grid grid-cols-2 gap-5">
        {/* Positive Word Cloud */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">긍정 리뷰 워드 클라우드</h3>
          <div className="h-64 flex flex-wrap items-center justify-center gap-2 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
            {positiveWordCloud.map((item) => (
              <span
                key={item.word}
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors cursor-default"
                style={{ fontSize: `${item.size * 0.35}px`, lineHeight: 1.2 }}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>

        {/* Negative Word Cloud */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">부정 리뷰 워드 클라우드</h3>
          <div className="h-64 flex flex-wrap items-center justify-center gap-2 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
            {negativeWordCloud.map((item) => (
              <span
                key={item.word}
                className="text-red-600 font-medium hover:text-red-700 transition-colors cursor-default"
                style={{ fontSize: `${item.size * 0.35}px`, lineHeight: 1.2 }}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
