import type { RegionKey } from "./regions";

export type Count = { blue: number; red: number };

export const REGION_COUNTS: Partial<Record<RegionKey, Count>> = {
  "서울": { blue: 0, red: 8 },
  "경기": { blue: 7, red: 3 },
  "강원": { blue: 2, red: 0 },
  "충북": { blue: 3, red: 1 },
  "전남": { blue: 4, red: 5 },
  "경남": { blue: 5, red: 4 },
  "부산": { blue: 0, red: 1 },
  "제주": { blue: 3, red: 0 },
};