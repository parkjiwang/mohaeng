export type Event = {
  id: string;
  title: string;
  region: string;
};

export const EVENTS: Event[] = [
  { id: "1", title: "서울 개발자 모임", region: "seoul" },
  { id: "2", title: "강남 스타트업 밋업", region: "seoul" },
  { id: "3", title: "부산 해커톤", region: "busan" },
  { id: "4", title: "제주 워케이션", region: "jeju" },
  { id: "5", title: "경기 AI 세미나", region: "gyeonggi" },
];
