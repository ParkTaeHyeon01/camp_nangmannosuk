import {
  Tent,
  BarChart3,
  TrendingUp,
  MessageSquare,
  MapPinned,
  Trees,
  Activity,
  Sparkles,
} from "lucide-react";

const featureCards = [
  {
    title: "전국 캠핑장 데이터 통합 관리",
    description:
      "전국 캠핑장 운영 현황과 주요 정보를 한 화면에서 구조적으로 관리할 수 있습니다.",
    icon: Tent,
    tone: "teal",
  },
  {
    title: "지역별 통계 및 방문 추이 분석",
    description:
      "지역별 이용 현황과 방문 흐름을 비교하여 변화 추이와 핵심 패턴을 빠르게 파악할 수 있습니다.",
    icon: BarChart3,
    tone: "blue",
  },
  {
    title: "미래 수요 및 혼잡도 예측",
    description:
      "예상 방문량과 혼잡도를 기반으로 향후 운영 대응과 자원 계획 수립을 지원합니다.",
    icon: TrendingUp,
    tone: "emerald",
  },
  {
    title: "리뷰 기반 운영 인사이트 확인",
    description:
      "리뷰 데이터를 통해 이용자 반응과 운영 개선 포인트를 직관적으로 확인할 수 있습니다.",
    icon: MessageSquare,
    tone: "amber",
  },
] as const;

function FeatureCard({
  title,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  tone: "teal" | "blue" | "emerald" | "amber";
}) {
  const toneClass = {
    teal: "bg-teal-50 text-teal-600 ring-1 ring-teal-100",
    blue: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
    amber: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  };

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${toneClass[tone]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mb-2 text-[17px] font-semibold tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}

function MiniInfoCard({
  label,
  title,
  icon: Icon,
  tone,
}: {
  label: string;
  title: string;
  icon: React.ElementType;
  tone: "teal" | "emerald" | "blue";
}) {
  const toneClass = {
    teal: "bg-teal-50 text-teal-600 ring-1 ring-teal-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
    blue: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
  };

  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${toneClass[tone]}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold tracking-tight text-gray-900">
        {title}
      </p>
    </div>
  );
}

export function MainHome() {
  return (
    <div className="mx-auto max-w-[1440px] p-6">
      <div className="space-y-8">
        {/* 상단 소개 카드 */}
        <section className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.08),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_30%)]" />

          <div className="relative grid grid-cols-1 gap-8 p-8 xl:grid-cols-[1.15fr_0.85fr] xl:p-10 2xl:p-12">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                <Sparkles className="h-3.5 w-3.5" />
                Camping Analytics Admin
              </div>

              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-900 xl:text-[40px] xl:leading-[1.15]">
                낭만 노숙 관리자 시스템
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 xl:text-base">
                전국 캠핑장 운영 현황, 통계, 수요 예측, 리뷰 데이터를 통합 관리하는
                분석 플랫폼입니다.
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                운영 현황을 빠르게 파악하고, 데이터 기반 의사결정을 지원하는 관리자용
                메인 페이지입니다.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                  전국 단위 운영 데이터
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                  예측 기반 의사결정 지원
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                  리뷰 인사이트 통합 확인
                </div>
              </div>
            </div>

            {/* 오른쪽 시각 요소 */}
            <div className="flex items-center">
              <div className="grid w-full grid-cols-2 gap-4">
                <MiniInfoCard
                  label="Nationwide"
                  title="전국 단위 캠핑 데이터"
                  icon={MapPinned}
                  tone="teal"
                />
                <MiniInfoCard
                  label="Insight"
                  title="운영 인사이트 제공"
                  icon={Trees}
                  tone="emerald"
                />
                
              </div>
            </div>
          </div>
        </section>

        {/* 가운데 기능 소개 */}
        <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm xl:p-8">
          <div className="mb-6 xl:mb-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-teal-600">
              Core Features
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              주요 기능 소개
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              관리자 시스템에서 제공하는 핵심 기능을 한눈에 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {featureCards.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
                tone={card.tone}
              />
            ))}
          </div>
        </section>

        {/* 하단 안내 */}
        <section className="rounded-[24px] border border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-800">
            좌측 메뉴에서 원하는 기능을 선택하세요.
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Dashboard, 캠핑장 관리, 통계 분석, 예측 분석, 리뷰 관리 메뉴를 통해
            각 업무 화면으로 이동할 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}