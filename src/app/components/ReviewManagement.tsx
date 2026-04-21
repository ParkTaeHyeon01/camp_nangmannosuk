import {
  AlertTriangle,
  CalendarDays,
  CloudSun,
  MessageSquare,
  SmilePlus,
  Frown,
  ThumbsUp,
  ThumbsDown,
  Search,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// 캠핑장별 긍정/부정 데이터
const campgroundSentimentData = [
  { campground: "난지", positive: 85, negative: 15 },
  { campground: "자라섬", positive: 72, negative: 28 },
  { campground: "양양", positive: 91, negative: 9 },
  { campground: "홍천", positive: 78, negative: 22 },
  { campground: "태안", positive: 88, negative: 12 },
];

// 계절별 긍정/부정 데이터
const seasonalTrendData = [
  { season: "봄", positive: 72, negative: 18 },
  { season: "여름", positive: 81, negative: 26 },
  { season: "가을", positive: 76, negative: 21 },
  { season: "겨울", positive: 63, negative: 17 },
];

// 캠핑장별 파이 데이터
const campgroundPieData = [
  { name: "난지", value: 85, color: "#10b981" },
  { name: "자라섬", value: 72, color: "#34d399" },
  { name: "양양", value: 91, color: "#059669" },
  { name: "홍천", value: 78, color: "#6ee7b7" },
];

// 계절별 파이 데이터
const seasonalPieData = [
  { name: "봄", value: 72, color: "#3b82f6" },
  { name: "여름", value: 81, color: "#60a5fa" },
  { name: "가을", value: 76, color: "#2563eb" },
  { name: "겨울", value: 63, color: "#93c5fd" },
];

const sentimentRatio = [
  { label: "긍정", value: 68, color: "#10b981" },
  { label: "부정", value: 18, color: "#ef4444" },
  { label: "중립", value: 14, color: "#9ca3af" },
];

const positiveCloudWords = [
  { text: "청결", size: "text-3xl" },
  { text: "친절", size: "text-2xl" },
  { text: "조용함", size: "text-4xl" },
  { text: "풍경", size: "text-3xl" },
  { text: "재방문", size: "text-xl" },
  { text: "가족", size: "text-2xl" },
  { text: "별보기", size: "text-lg" },
  { text: "산책", size: "text-xl" },
  { text: "넓음", size: "text-2xl" },
  { text: "만족", size: "text-3xl" },
];

const negativeCloudWords = [
  { text: "소음", size: "text-3xl" },
  { text: "주차", size: "text-2xl" },
  { text: "화장실", size: "text-4xl" },
  { text: "벌레", size: "text-3xl" },
  { text: "혼잡", size: "text-xl" },
  { text: "샤워실", size: "text-2xl" },
  { text: "대기", size: "text-lg" },
  { text: "먼지", size: "text-xl" },
  { text: "불편", size: "text-2xl" },
  { text: "관리", size: "text-lg" },
];

const reviewRows = [
  {
    campground: "가평 숲속 캠핑장",
    date: "2026-04-12",
    rating: 4.8,
    sentiment: "positive",
    keywords: ["청결", "조용함", "친절"],
    excerpt:
      "사이트 간격이 넓고 조용해서 가족 캠핑하기 좋았어요.",
  },
  {
    campground: "강릉 오션뷰 캠핑파크",
    date: "2026-04-11",
    rating: 2.3,
    sentiment: "negative",
    keywords: ["주차", "소음", "혼잡"],
    excerpt: "주말이라 소음이 계속 들려서 쉬기 어려웠습니다.",
  },
  {
    campground: "태안 노을 캠핑존",
    date: "2026-04-10",
    rating: 3.9,
    sentiment: "neutral",
    keywords: ["뷰", "화장실", "대기"],
    excerpt:
      "바다 전망은 좋았지만 공용시설 이용 대기가 길어서 성수기 운영 개선이 필요해 보였습니다.",
  },
  {
    campground: "제천 힐링 캠프필드",
    date: "2026-04-09",
    rating: 4.6,
    sentiment: "positive",
    keywords: ["산책로", "청결", "재방문"],
    excerpt:
      "산책로가 좋고 전체적으로 깨끗해서 재방문 의사가 높습니다.",
  },
];

function SentimentBadge({
  sentiment,
}: {
  sentiment: "positive" | "negative" | "neutral";
}) {
  const styles = {
    positive: "bg-emerald-50 text-emerald-600",
    negative: "bg-red-50 text-red-600",
    neutral: "bg-gray-100 text-gray-600",
  };

  const labels = {
    positive: "긍정",
    negative: "부정",
    neutral: "중립",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[sentiment]}`}
    >
      {labels[sentiment]}
    </span>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-800">
        {rating.toFixed(1)}
      </span>
      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(rating) ? "★" : "☆"}
          </span>
        ))}
      </div>
    </div>
  );
}

function WordCloud({
  words,
  tone,
}: {
  words: { text: string; size: string }[];
  tone: "positive" | "negative";
}) {
  const toneStyle =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-700";

  return (
    <div className="flex min-h-[220px] flex-wrap items-center justify-center gap-3 rounded-xl bg-gray-50 p-5">
      {words.map((word) => (
        <span
          key={word.text}
          className={`${word.size} ${toneStyle} rounded-full px-3 py-2 font-semibold tracking-tight`}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}

export function ReviewManagement() {
  return (
    <div className="mx-auto max-w-[1440px] p-6">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            리뷰 관리
          </h1>
          <p className="text-sm text-gray-600">
            캠핑장별 리뷰 데이터와 감성 분석을 모니터링합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 shadow-sm">
            <Search className="h-4 w-4" />
            <span>리뷰 검색</span>
          </div>
          <div className="rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700">
            최근 30일 기준
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* KPI */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Positive Review Ratio
              </span>
              <SmilePlus className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              68.4%
            </div>
            <p className="mt-3 text-xs font-medium text-emerald-600">
              ▲ 전월 대비 4.2% 증가
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Negative Review Ratio
              </span>
              <Frown className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              18.1%
            </div>
            <p className="mt-3 text-xs font-medium text-red-500">
              ▲ 특정 주말 구간 증가 감지
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Average Rating
              </span>
              <MessageSquare className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              4.3 / 5
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">
              전체 리뷰 12,840건 기준
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                Recent Negative Increase
              </span>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-gray-900">
              +6.8%
            </div>
            <p className="mt-3 text-xs font-medium text-red-500">
              화장실·주차 관련 부정 리뷰 증가
            </p>
          </div>
        </section>

        {/* 차트 영역 */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  캠핑장별 긍정/부정 리뷰
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  캠핑장별 감성 비교 막대그래프
                </p>
              </div>
              <ThumbsUp className="h-5 w-5 text-emerald-500" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campgroundSentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="campground"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="positive"
                  name="긍정"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="negative"
                  name="부정"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  계절별 긍정/부정 리뷰
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  계절별 감성 비교 막대그래프
                </p>
              </div>
              <CloudSun className="h-5 w-5 text-teal-600" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="season"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="positive"
                  name="긍정"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="negative"
                  name="부정"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  캠핑장별 긍정 비중
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  캠핑장별 파이차트
                </p>
              </div>
              <CalendarDays className="h-5 w-5 text-teal-600" />
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={campgroundPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {campgroundPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  계절별 긍정 비중
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  계절별 파이차트
                </p>
              </div>
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={seasonalPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {seasonalPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 감성 비율 + 워드클라우드 */}
        <section className="grid grid-cols-1 gap-4 2xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Sentiment Ratio
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                최근 리뷰 감성 구성 비율
              </p>
            </div>

            <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="flex h-full w-full overflow-hidden rounded-full">
                {sentimentRatio.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {sentimentRatio.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Positive Word Cloud
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  많이 등장한 긍정 표현
                </p>
              </div>
              <WordCloud
                words={positiveCloudWords}
                tone="positive"
              />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Negative Word Cloud
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  많이 등장한 부정 표현
                </p>
              </div>
              <WordCloud
                words={negativeCloudWords}
                tone="negative"
              />
            </div>
          </div>
        </section>

        {/* 리뷰 리스트 */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Review List
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                최근 리뷰 상세 목록
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Campground
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Date
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Rating
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Sentiment
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Main Keywords
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Review Excerpt
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewRows.map((row) => (
                  <tr
                    key={`${row.campground}-${row.date}`}
                    className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="py-4 pr-4 text-sm font-semibold text-gray-900">
                      {row.campground}
                    </td>
                    <td className="py-4 pr-4 text-sm text-gray-600">
                      {row.date}
                    </td>
                    <td className="py-4 pr-4">
                      <RatingStars rating={row.rating} />
                    </td>
                    <td className="py-4 pr-4">
                      <SentimentBadge
                        sentiment={
                          row.sentiment as
                            | "positive"
                            | "negative"
                            | "neutral"
                        }
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap gap-2">
                        {row.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="max-w-[360px] py-4 pr-4 text-sm leading-6 text-gray-600">
                      {row.excerpt}
                    </td>
                    <td className="py-4 text-right">
                      <button className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600">
                        상세보기
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}