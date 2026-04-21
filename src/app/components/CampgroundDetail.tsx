import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit, 
  MapPin, 
  Wifi,
  Zap,
  ShowerHead,
  Store,
  Tent,
  Users,
  Star,
  Upload,
  Image as ImageIcon,
  Loader2
} from "lucide-react";

// 서버 응답 데이터 타입 정의
interface CampgroundDetailData {
  camspot_id: number;
  name: string;
  address: string;
  fire_pit: string;
  facilities: string;
  surroundings: string;
  theme: string;
  pet_allowed: string;
  price_off_weekday: number;
  price_off_weekend: number;
  price_peak_weekday: number;
  price_peak_weekend: number;
  naver_id: string;
  states: string;
}

export function CampgroundDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState<CampgroundDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/campgrounds/${id}`);
        const result = await response.json();
        // 배열로 올 경우 첫 번째 객체 선택, 객체로 올 경우 그대로 사용
        const detailData = Array.isArray(result) ? result[0] : result;
        setData(detailData);
      } catch (error) {
        console.error("상세 정보 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-gray-500">정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto bg-gray-50 min-h-screen">
      {/* 상단 네비게이션 */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> 리스트로 돌아가기
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* 메인 정보 섹션 (왼쪽) */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    data.states === "운영중" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {data.states}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" /> {data.address}
                </div>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all font-medium shadow-sm">
                <Edit className="w-4 h-4" /> 정보 수정
              </button>
            </div>

            {/* 가격 정보 그리드 */}
            <div className="grid grid-cols-4 gap-4 py-8 border-t border-b border-gray-100 mb-8 bg-gray-50/50 rounded-lg px-4">
              <div className="text-left">
                <p className="text-xs text-gray-500 mb-1">평일 비수기</p>
                <p className="text-lg font-bold text-gray-900">₩{data.price_off_weekday.toLocaleString()}</p>
              </div>
              <div className="text-left border-l pl-4 border-gray-200">
                <p className="text-xs text-gray-500 mb-1">주말 비수기</p>
                <p className="text-lg font-bold text-teal-600">₩{data.price_off_weekend.toLocaleString()}</p>
              </div>
              <div className="text-left border-l pl-4 border-gray-200">
                <p className="text-xs text-gray-500 mb-1">평일 성수기</p>
                <p className="text-lg font-bold text-gray-900">₩{data.price_peak_weekday.toLocaleString()}</p>
              </div>
              <div className="text-left border-l pl-4 border-gray-200">
                <p className="text-xs text-gray-500 mb-1">주말 성수기</p>
                <p className="text-lg font-bold text-rose-500">₩{data.price_peak_weekend.toLocaleString()}</p>
              </div>
            </div>

            <div className="text-left space-y-4">
              <h2 className="text-lg font-bold text-gray-900">테마 및 특징</h2>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                {data.theme === "정보없음" ? "등록된 테마 정보가 없습니다." : data.theme}
              </p>
            </div>
          </div>

          {/* 편의 시설 섹션 */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-6">보유 시설</h2>
            <div className="flex flex-wrap gap-2">
              {data.facilities.split(',').map((facility, index) => (
                <span key={index} className="px-4 py-2 bg-white text-gray-700 text-sm rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  {facility.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 요약 정보 섹션 (오른쪽) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-left">
            <h2 className="text-base font-bold text-gray-900 mb-5 pb-3 border-b">운영 상세 정보</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2"><Tent className="w-4 h-4" /> 화로대</span>
                <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{data.fire_pit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2"><Users className="w-4 h-4" /> 반려동물</span>
                <span className="font-semibold text-gray-900">{data.pet_allowed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2"><Star className="w-4 h-4" /> 네이버 ID</span>
                <span className="font-mono text-teal-600 font-bold">{data.naver_id}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t">
                <span className="text-gray-500">주변 환경</span>
                <span className="text-gray-900 text-xs">{data.surroundings}</span>
              </div>
            </div>
          </div>
          
          {/* 이미지/지도 업로드 (디자인 유지) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-left">
            <h2 className="text-base font-bold text-gray-900 mb-4">이미지 관리</h2>
            <div className="border-2 border-dashed border-gray-100 rounded-xl p-8 text-center hover:border-teal-300 hover:bg-teal-50 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-bold text-gray-700 mb-1">배치도 및 사진</p>
              <p className="text-xs text-gray-400 mb-4">최대 10MB까지 업로드 가능</p>
              <button className="px-4 py-2 text-xs font-bold text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors w-full">
                파일 추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}