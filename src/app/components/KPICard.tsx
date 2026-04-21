import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: number;      // ? 추가: 선택적 속성으로 변경
  description?: string; // ? 추가: 선택적 속성으로 변경
}

export function KPICard({ title, value, change, icon: Icon, description }: KPICardProps) {
  // change 값이 있을 때만 증감 여부 판단
  const isPositive = change !== undefined ? change >= 0 : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2.5 bg-teal-50 rounded-lg">
          <Icon className="w-5 h-5 text-teal-600" />
        </div>
      </div>
      
      {/* change나 description이 있을 때만 하단 바를 렌더링 */}
      {(change !== undefined || description) && (
        <div className="flex items-center gap-2 mt-2">
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? "text-emerald-600" : "text-red-600"
            }`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{isPositive ? "+" : ""}{change}%</span>
            </div>
          )}
          {description && <span className="text-sm text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  );
}