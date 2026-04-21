import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Edit,
  MoreVertical,
  Filter,
  Download,
  Plus,
  Loader2
} from "lucide-react";

type SortField = "name" | "region" | "price" | "rating" | "visits" | null;
type SortOrder = "asc" | "desc";
type CampgroundStatus = "active" | "inactive";

interface Campground {
  id: number;
  name: string;
  region: string;
  address: string;
  price: number;
  rating: number;
  visits: number;
  status: CampgroundStatus;
  petAllowed: string;
  facilities: string;
}

export function CampgroundManagement() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [data, setData] = useState<Campground[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // 필터 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // API 데이터 페칭
  useEffect(() => {
    const fetchCampgrounds = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/campgrounds?page=${currentPage}`);
        const rawData = await response.json();

        const mappedData: Campground[] = rawData.map((item: any) => ({
          id: item.camspot_id,
          name: item.name.trim(),
          address: item.address,
          region: item.address.split(" ")[0].substring(0, 2),
          price: item.price_off_weekend,
          status: item.states === "운영중" ? "active" : "inactive",
          petAllowed: item.pet_allowed,
          facilities: item.facilities,
          rating: 0, 
          visits: 0,
        }));
        setData(mappedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampgrounds();
  }, [currentPage]);

  // 필터링 및 정렬 로직
  const filteredData = data
    .filter((item) => {
      const matchesSearch = searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === "all" || item.region === regionFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesRegion && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusColor = (status: CampgroundStatus) => 
    status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700";

  const getStatusLabel = (status: CampgroundStatus) => 
    status === "active" ? "운영중" : "휴업";

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-left">캠핑장 관리</h1>
          <p className="text-sm text-gray-600 text-left">전국 캠핑장 정보를 조회하고 관리할 수 있습니다</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> 내보내기
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> 캠핑장 등록
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-left shadow-sm">
          <div className="text-sm text-gray-600 mb-1">운영중</div>
          <div className="text-2xl font-bold text-emerald-600">{data.filter(d => d.status === 'active').length}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-left shadow-sm">
          <div className="text-sm text-gray-600 mb-1">휴업</div>
          <div className="text-2xl font-bold text-gray-600">{data.filter(d => d.status === 'inactive').length}</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-5">
        {/* Table Area */}
        <div className="col-span-2">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="캠핑장 이름으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white">
                  <option value="all">전체 지역</option>
                  <option value="강원">강원</option>
                  <option value="경기">경기</option>
                  <option value="전라">전라</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white">
                  <option value="all">전체 상태</option>
                  <option value="active">운영중</option>
                  <option value="inactive">휴업</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm min-h-[400px] relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">캠핑장명</th>
                    <th className="px-4 py-3 text-left">지역</th>
                    <th className="px-4 py-3 text-left">주소</th>
                    <th className="px-4 py-3 text-right">주말가격</th>
                    <th className="px-4 py-3 text-center">상태</th>
                    <th className="px-4 py-3 text-center">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/campground/${item.id}`)}>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.region}</td>
                      <td className="px-4 py-3 text-gray-500 truncate max-w-[150px]">{item.address}</td>
                      <td className="px-4 py-3 text-right font-mono text-gray-900">₩{item.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Eye className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-white">
              <div className="text-sm text-gray-600">현재 페이지: <span className="font-bold">{currentPage}</span></div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50 disabled:opacity-30">이전</button>
                <button onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1.5 bg-teal-600 text-white rounded text-sm hover:bg-teal-700 font-medium">다음</button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm text-left">
            <h3 className="text-sm font-bold text-gray-900 mb-4">최근 업데이트</h3>
            <div className="space-y-3">
              {data.slice(0, 3).map((item) => (
                <div key={item.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.region} | {getStatusLabel(item.status)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm text-left">
            <h3 className="text-sm font-bold text-gray-900 mb-4">빠른 작업</h3>
            <button className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 rounded-lg text-gray-700 transition-colors">엑셀 업로드</button>
            <button className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 rounded-lg text-gray-700 transition-colors">리포트 생성</button>
          </div>
        </div>
      </div>
    </div>
  );
}