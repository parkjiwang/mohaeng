"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/** ===== 아이콘 ===== */
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 20a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconLogin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 7V6a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M13 12H3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M6 9l-3 3 3 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** ===== 헤더(로고 + 검색 + 우측 메뉴) =====
 *  /login/login_board 는 "로그아웃 상태 페이지"라서
 *  쿠키랑 상관없이 우측을 "회원가입/로그인"으로 고정합니다.
 */
function HeaderBarLoggedOut() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <header className="w-full border border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
        {/* 로고: 로그아웃 홈(/login)로 */}
        <button onClick={() => router.push("/login")} className="flex items-center gap-3 hover:opacity-90">
          <Image src="/images/moheng.png" alt="모행" width={88} height={36} priority />
        </button>

        {/* 검색 */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[520px] relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder=""
              className="w-full h-10 rounded-full border border-gray-400 px-4 pr-10 text-sm outline-none focus:border-gray-800"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
              aria-label="검색"
            >
              <IconSearch />
            </button>
          </div>
        </div>

        {/* 우측: 회원가입 / 로그인 (고정) */}
        <div className="flex items-center gap-4 text-sm text-gray-900">
          <Link href="/join" className="inline-flex items-center gap-2 hover:opacity-80">
            <IconUser />
            <span>회원가입</span>
          </Link>
          <Link href="/signup" className="inline-flex items-center gap-2 hover:opacity-80">
            <IconLogin />
            <span>로그인</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

/** ===== 좌측 사이드바 ===== */
function Sidebar({
  categories,
  topics,
  selectedCats,
  selectedTopics,
  toggleCat,
  toggleTopic,
}: {
  categories: { label: string }[];
  topics: { label: string }[];
  selectedCats: Set<string>;
  selectedTopics: Set<string>;
  toggleCat: (v: string) => void;
  toggleTopic: (v: string) => void;
}) {
  return (
    <aside className="w-[230px] shrink-0 border-r border-gray-300 bg-white">
      <div className="px-5 py-6">
        <div className="text-[11px] tracking-[0.12em] text-gray-500 mb-3">CATEGORIES</div>

        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.label} className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selectedCats.has(c.label)}
                onChange={() => toggleCat(c.label)}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-10 text-[11px] tracking-[0.12em] text-gray-500 mb-3">TOPICS</div>

        <div className="space-y-2">
          {topics.map((t) => (
            <label key={t.label} className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selectedTopics.has(t.label)}
                onChange={() => toggleTopic(t.label)}
              />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

/** ===== 상단 필터(지역/시군구/기간/정렬/행사만들기) ===== */
function Filters({
  sido,
  setSido,
  sort,
  setSort,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  includeEnded,
  setIncludeEnded,
}: {
  sido: string;
  setSido: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
  includeEnded: boolean;
  setIncludeEnded: (v: boolean) => void;
}) {
  const sigungu = useMemo(
    () => [
      "경산",
      "경주",
      "고령",
      "구미",
      "김천",
      "문경",
      "봉화",
      "상주",
      "성주",
      "안동",
      "영덕",
      "영양",
      "영주",
      "영천",
      "예천",
      "울진",
      "의성",
      "청도",
      "청송",
      "포항",
    ],
    []
  );

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-3">
        {/* 좌측: 시/도 + 시군구 */}
        <div className="flex flex-col gap-2">
          <select
            value={sido}
            onChange={(e) => setSido(e.target.value)}
            className="h-7 w-[120px] border border-gray-400 text-xs px-2"
          >
            <option>경상북도</option>
            <option>서울</option>
            <option>경기도</option>
            <option>부산</option>
          </select>

          <div className="border border-gray-300 rounded-lg px-4 py-3 w-[520px] max-w-[70vw] bg-white">
            <div className="grid grid-cols-10 gap-y-1 text-[12px] text-gray-900">
              {sigungu.map((s) => (
                <button key={s} type="button" className="text-left hover:underline" title={s}>
                  • {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 행사 만들기 (로그아웃 상태에서는 로그인 유도) */}
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 text-xs border border-gray-300 bg-white px-3 py-2 rounded hover:bg-gray-50"
        >
          <IconPlus />
          <span>행사 만들기</span>
        </Link>
      </div>

      {/* 두 번째 줄 */}
      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-gray-800 cursor-pointer">
          <input type="checkbox" checked={includeEnded} onChange={(e) => setIncludeEnded(e.target.checked)} />
          <span>종료된 행사 포함</span>
        </label>

        <div className="flex items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-7 border border-gray-400 text-xs px-2">
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-7 border border-gray-400 text-xs px-2"
            />
            <span className="text-xs text-gray-600">~</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-7 border border-gray-400 text-xs px-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** ===== 카드 ===== */
function EventCard({ title }: { title: string }) {
  return (
    <article className="w-full">
      <div className="w-full aspect-[4/3] rounded-[18px] border border-gray-300 bg-white" />
      <div className="mt-3 h-[2px] w-[120px] bg-gray-300" />
      <div className="mt-2 text-sm text-gray-900 line-clamp-1">{title}</div>
    </article>
  );
}

/** ===== 푸터 ===== */
function Footer() {
  return (
    <footer className="mt-10 border border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-7 flex items-center justify-between text-xs text-gray-700">
        <div>
          <div className="font-semibold mb-2">고객센터</div>
          <div>운영 시간 : 평일(월~금요일) 10:00 ~ 17:00</div>
          <div>점심시간 12:00 ~ 13:00</div>
          <div className="mt-2">이메일 : soon990906@gmail.com</div>
          <div>전화번호 : 010-6661-1129</div>
        </div>
        <div className="text-gray-500">© 2026 모행(Mohang). All rights reserved.</div>
      </div>
    </footer>
  );
}

/** ===== 페이지 ===== */
export default function LoginBoardPage() {
  // 필터 state
  const [sido, setSido] = useState("경상북도");
  const [sort, setSort] = useState("latest");
  const [dateFrom, setDateFrom] = useState("2026-01-29");
  const [dateTo, setDateTo] = useState("2026-02-10");
  const [includeEnded, setIncludeEnded] = useState(false);

  const categories = [
    { label: "교육/워크숍" },
    { label: "강연/세미나" },
    { label: "박람회/전시회" },
    { label: "공모전/대회" },
    { label: "스포츠/체험" },
    { label: "쇼핑/플리마켓" },
    { label: "파티/네트워킹" },
    { label: "공연/방송" },
  ];

  const topics = [
    { label: "패션/뷰티" },
    { label: "여행/레저" },
    { label: "운동/건강" },
    { label: "가전/환경" },
    { label: "반려동물/식물" },
    { label: "가족/육아" },
    { label: "동식/음료" },
    { label: "종교" },
  ];

  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

  const toggleCat = (v: string) => {
    setSelectedCats((prev) => {
      const n = new Set(prev);
      n.has(v) ? n.delete(v) : n.add(v);
      return n;
    });
  };

  const toggleTopic = (v: string) => {
    setSelectedTopics((prev) => {
      const n = new Set(prev);
      n.has(v) ? n.delete(v) : n.add(v);
      return n;
    });
  };

  // 카드 mock
  const cards = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: `행사 제목 예시 ${i + 1}`,
  }));

  return (
    <main className="min-h-[100svh] bg-white">
      <HeaderBarLoggedOut />

      <div className="mx-auto max-w-6xl">
        <div className="flex">
          <Sidebar
            categories={categories}
            topics={topics}
            selectedCats={selectedCats}
            selectedTopics={selectedTopics}
            toggleCat={toggleCat}
            toggleTopic={toggleTopic}
          />

          {/* 메인 */}
          <section className="flex-1 px-8 py-6">
            <Filters
              sido={sido}
              setSido={setSido}
              sort={sort}
              setSort={setSort}
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              dateTo={dateTo}
              setDateTo={setDateTo}
              includeEnded={includeEnded}
              setIncludeEnded={setIncludeEnded}
            />

            {/* 카드 그리드 */}
            <div className="mt-8 grid grid-cols-3 gap-x-12 gap-y-10">
              {cards.map((c) => (
                <EventCard key={c.id} title={c.title} />
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-800">
              <button className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50">←이전</button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className="w-7 h-7 rounded border border-gray-300 hover:bg-gray-50">
                  {n}
                </button>
              ))}
              <button className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50">다음→</button>
            </div>
          </section>
        </div>
      </div>

      {/* 우측 플로팅 버튼(이미지 느낌) */}
      <div className="fixed right-6 bottom-28">
        <button className="w-12 h-12 rounded-full bg-teal-400 shadow-md hover:brightness-95" aria-label="플로팅 버튼" />
      </div>
      <div className="fixed right-6 bottom-10">
        <button className="w-12 h-12 rounded-full bg-sky-500 shadow-md hover:brightness-95 flex items-center justify-center text-white font-bold">
          🤖
        </button>
      </div>

      <Footer />
    </main>
  );
}

