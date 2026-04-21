import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  description: string;
}

export function KPICard({ title, value, change, icon: Icon, description }: KPICardProps) {
  const isPositive = change >= 0;

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
      
      <div className="flex items-center gap-2">
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
        <span className="text-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
}
