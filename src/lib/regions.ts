export type RegionKey =
  | "서울" | "경기" | "인천" | "강원"
  | "충북" | "충남" | "세종" | "대전"
  | "전북" | "전남" | "광주"
  | "경북" | "경남" | "대구" | "부산" | "울산"
  | "제주";

export const REGION_CENTER: Record<RegionKey, { lat: number; lng: number; slug: string }> = {
  "서울": { lat: 37.5665, lng: 126.9780, slug: "seoul" },
  "경기": { lat: 37.4138, lng: 127.5183, slug: "gyeonggi" },
  "인천": { lat: 37.4563, lng: 126.7052, slug: "incheon" },
  "강원": { lat: 37.8228, lng: 128.1555, slug: "gangwon" },

  "충북": { lat: 36.6357, lng: 127.4917, slug: "chungbuk" },
  "충남": { lat: 36.5184, lng: 126.8000, slug: "chungnam" },
  "세종": { lat: 36.4800, lng: 127.2890, slug: "sejong" },
  "대전": { lat: 36.3504, lng: 127.3845, slug: "daejeon" },

  "전북": { lat: 35.7175, lng: 127.1530, slug: "jeonbuk" },
  "전남": { lat: 34.8160, lng: 126.4630, slug: "jeonnam" },
  "광주": { lat: 35.1595, lng: 126.8526, slug: "gwangju" },

  "경북": { lat: 36.4919, lng: 128.8889, slug: "gyeongbuk" },
  "경남": { lat: 35.4606, lng: 128.2132, slug: "gyeongnam" },
  "대구": { lat: 35.8714, lng: 128.6014, slug: "daegu" },
  "부산": { lat: 35.1796, lng: 129.0756, slug: "busan" },
  "울산": { lat: 35.5384, lng: 129.3114, slug: "ulsan" },

  "제주": { lat: 33.4996, lng: 126.5312, slug: "jeju" },
};