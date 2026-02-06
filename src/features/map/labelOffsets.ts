import type { RegionKey } from "@/lib/regions";

export const labelText: Partial<Record<RegionKey, string>> = {
  서울: "서울",
  세종: "세종",
  부산: "부산",
  인천: "인천",
  대구: "대구",
  대전: "대전",
  광주: "광주",
  울산: "울산",
  경기: "경기도",
  강원: "강원도",
  충북: "충청북도",
  충남: "충청남도",
  전북: "전라북도",
  전남: "전라남도",
  경북: "경상북도",
  경남: "경상남도",
  제주: "제주도",
};

// 왕자님이 계속 조정하던 값들 여기서만 관리하면 편합니다.
export const labelOffset: Partial<Record<RegionKey, { dx: number; dy: number }>> = {
  경기: { dx: 20, dy: 35 },
  충북: { dx: -40, dy: -8 },
  제주: { dx: 0, dy: -5 },
  울산: { dx: 0, dy: 0 },
  대구: { dx: 4, dy: 0 },
  광주: { dx: 0, dy: 0 },
  세종: { dx: 0, dy: 10 },
  인천: { dx: -5, dy: 0 },
  서울: { dx: 0, dy: 5 },
  부산: { dx: 5, dy: 5 },
};
