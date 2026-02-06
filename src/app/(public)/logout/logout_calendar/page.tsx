"use client";

import Background from "@/components/Background";
import TopNav from "@/components/TopNav";
import TitleBlock from "@/components/TitleBlock";

const REGIONS = [
  "서울",
  "경기도",
  "인천",
  "강원도",
  "충북",
  "충남",
  "대전",
  "세종",
  "전북",
  "전남",
  "광주",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주도",
];

function RegionChips() {
  return (
    <div className="mx-auto w-full max-w-3xl bg-white/90 rounded-xl border border-black/10 px-4 py-3 shadow-sm">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-gray-800">
        {REGIONS.map((r) => (
          <button key={r} type="button" className="hover:opacity-80">
            • {r}
          </button>
        ))}
      </div>
    </div>
  );
}

function CalendarCard() {
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const cells = [
    ["", "", "", "", "", "", "1"],
    ["2", "3", "4", "5", "6", "7", "8"],
    ["9", "10", "11", "12", "13", "14", "15"],
    ["16", "17", "18", "19", "20", "21", "22"],
    ["23", "24", "25", "26", "27", "28", "29"],
    ["30", "", "", "", "", "", ""],
  ];

  const miniEvent = (text: string) => (
    <div className="mt-1 rounded bg-black/5 px-1 py-[1px] text-[9px] text-gray-700 leading-tight">
      • {text}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-3xl mt-6">
      <div className="rounded-[22px] bg-white/95 shadow-lg border border-black/10 px-7 pt-6 pb-5">
        <div className="flex items-end justify-between mb-4">
          <div className="text-[34px] font-extrabold tracking-tight text-gray-900">2025</div>
          <div className="text-[28px] font-semibold text-gray-800">November</div>
        </div>

        <div className="grid grid-cols-7 border border-black/20 overflow-hidden">
          {week.map((w) => (
            <div
              key={w}
              className="bg-[#1f2a37] text-white text-[11px] py-2 text-center border-r border-white/10 last:border-r-0"
            >
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-rows-6 border-l border-r border-b border-black/20">
          {cells.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7">
              {row.map((d, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className="h-[64px] border-t border-black/20 border-r border-black/20 last:border-r-0 px-2 py-1"
                >
                  <div className="text-[10px] text-gray-700">{d}</div>

                  {d === "13" && miniEvent("행사명")}
                  {d === "18" && miniEvent("행사명")}
                  {d === "20" && miniEvent("행사명")}
                  {d === "21" && miniEvent("행사명")}
                  {d === "28" && miniEvent("행사명")}
                  {d === "29" && miniEvent("행사명")}
                  {d === "30" && miniEvent("행사명")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 mt-5">
          <button type="button" className="text-2xl font-bold hover:opacity-70">
            ←
          </button>
          <div className="rounded-md border border-black/20 px-4 py-1 text-[12px] text-gray-800">2025.11</div>
          <button type="button" className="text-2xl font-bold hover:opacity-70">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LogoutCalendarPage() {
  return (
    <main className="relative min-h-[100svh]">
      <Background position="50% 90%" />

      {/* ✅ 로그인 상태 상단바(logout 디자인) */}
      <TopNav variant="in" />

      <section className="pt-24 pb-10">
        <div className="w-full px-6">
          <TitleBlock
            title="- 모두의 모든 행사 -"
            desc="원하는 날짜를 선택해 행사 일정을 확인하세요."
            logoWidth={140}
            logoHeight={56}
          />

          <div className="mt-4">
            <RegionChips />
            <CalendarCard />
          </div>
        </div>
      </section>
    </main>
  );
}
