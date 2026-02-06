import type { RegionKey } from "@/lib/regions"; // ✅ 기존 regions.ts 타입을 그대로 사용

export function normalizeRegionName(raw?: string): RegionKey | null {
  if (!raw) return null;
  const s = String(raw).toLowerCase().replace(/\s/g, "");

  if (s.includes("서울") || s.includes("seoul")) return "서울";
  if (s.includes("경기") || s.includes("gyeonggi")) return "경기";
  if (s.includes("인천") || s.includes("incheon")) return "인천";
  if (s.includes("강원") || s.includes("gangwon")) return "강원";

  if (s.includes("충청북") || s.includes("northchungcheong") || s.includes("chungbuk")) return "충북";
  if (s.includes("충청남") || s.includes("southchungcheong") || s.includes("chungnam")) return "충남";
  if (s.includes("세종") || s.includes("sejong")) return "세종";
  if (s.includes("대전") || s.includes("daejeon")) return "대전";

  if (s.includes("전라북") || s.includes("northjeolla") || s.includes("jeonbuk")) return "전북";
  if (s.includes("전라남") || s.includes("southjeolla") || s.includes("jeonnam")) return "전남";
  if (s.includes("광주") || s.includes("gwangju")) return "광주";

  if (s.includes("경상북") || s.includes("northgyeongsang") || s.includes("gyeongbuk")) return "경북";
  if (s.includes("경상남") || s.includes("southgyeongsang") || s.includes("gyeongnam")) return "경남";
  if (s.includes("대구") || s.includes("daegu")) return "대구";
  if (s.includes("부산") || s.includes("busan") || s.includes("pusan")) return "부산";
  if (s.includes("울산") || s.includes("ulsan")) return "울산";

  if (s.includes("제주") || s.includes("jeju")) return "제주";
  return null;
}
