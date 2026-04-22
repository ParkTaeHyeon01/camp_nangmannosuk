import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Loader2
} from "lucide-react";

// 타입 정의
type SortField = "name" | "price" | "camspot_id";
type SortOrder = "asc" | "desc";
type CampgroundStatus = "active" | "inactive";

interface Campground {
  id: number;
  name: string;
  region: string;
  address: string;
  price: number;
  status: CampgroundStatus;
  petAllowed: string;
  facilities: string;
}

export function CampgroundManagement() {
  const navigate = useNavigate();

  // 데이터 로딩 및 페이지 상태
  const [data, setData] = useState<Campground[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 검색 및 필터 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // 정렬 상태
  const [sortField, setSortField] = useState<SortField>("camspot_id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // API 데이터 페칭 (모든 필터링 로직 포함)
  const fetchCampgrounds = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        sort_by: sortField,
        order: sortOrder,
      });

      // 서버 사이드 검색/필터 파라미터 추가
      if (searchQuery) params.append("search", searchQuery);
      if (regionFilter !== "all") params.append("region", regionFilter);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const response = await fetch(`http://localhost:8000/campgrounds?${params.toString()}`);
      if (!response.ok) throw new Error("데이터를 로드하는 중 오류가 발생했습니다.");

      const rawData = await response.json();

      const mappedData: Campground[] = rawData.map((item: any) => ({
        id: item.camspot_id,
        name: item.name.trim(),
        address: item.address,
        region: item.address.split(" ")[0].substring(0, 2),
        price: item.price_off_weekend || 0,
        status: item.states === "운영중" ? "active" : "inactive",
        petAllowed: item.pet_allowed,
        facilities: item.facilities,
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, regionFilter, statusFilter, sortField, sortOrder]);

  // 디바운스(Debounce) 적용: 사용자의 연속된 입력을 기다린 후 API 호출
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCampgrounds();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchCampgrounds]);

  // 통합 필터 변경 핸들러 (변경 시 무조건 1페이지로 이동)
  const handleFilterChange = (type: 'search' | 'region' | 'status', value: string) => {
    if (type === 'search') setSearchQuery(value);
    if (type === 'region') setRegionFilter(value);
    if (type === 'status') setStatusFilter(value);
    setCurrentPage(1);
  };

  // 정렬 핸들러
  const handleSort = (field: SortField) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-left">캠핑장 통합 관리</h1>
        <p className="text-sm text-gray-600 text-left">모든 필터와 정렬은 데이터베이스와 실시간으로 연동됩니다.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* 검색어 입력 */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="캠핑장 이름으로 서버 검색..."
              value={searchQuery}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />
          </div>

          {/* 지역 필터 */}
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="all">전체 지역</option>
              <option value="서울">서울시</option>
              <option value="경기">경기도</option>
              <option value="강원">강원도</option>
              <option value="충청">충청도</option>
              <option value="전라">전라도</option>
              <option value="경상">경상도</option>
              <option value="제주">제주특별자치도</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* 운영 상태 필터 */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="all">전체 상태</option>
              <option value="active">운영중</option>
              <option value="inactive">휴업</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative min-h-[450px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">캠핑장명 <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-4 py-3 text-left">지역</th>
                <th className="px-4 py-3 text-left">주소</th>
                <th className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => handleSort("price")}>
                  <div className="flex items-center justify-end gap-1">주말가격 <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-4 py-3 text-center">상태</th>
                <th className="px-4 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/campground/${item.id}`)}>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600">{item.region}</td>
                    <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">{item.address}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">₩{item.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                        {item.status === 'active' ? '운영중' : '휴업'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Eye className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-20 text-center text-gray-400">조건에 맞는 캠핑장 데이터가 없습니다.</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-white">
          <div className="text-sm text-gray-600">페이지 <span className="font-bold text-teal-600">{currentPage}</span></div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1 || isLoading}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              이전
            </button>
            <button
              disabled={isLoading || data.length < 50}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-all"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}