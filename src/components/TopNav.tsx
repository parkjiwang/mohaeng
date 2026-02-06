"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* 로그인 여부 */
function isLoggedInClient() {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("moheng_logged_in=1");
}

/* ===== 아이콘 ===== */

function IconMap() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 3v15M15 6v15" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M7 3v3M17 3v3M4.5 7.5h15" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 5.5h11A2 2 0 0119.5 7.5v12A2 2 0 0117.5 21.5h-11A2 2 0 014.5 19.5v-12A2 2 0 016.5 5.5z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconBoard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 6.5h11A2 2 0 0119.5 8.5v9A2 2 0 0117.5 19.5h-11A2 2 0 014.5 17.5v-9A2 2 0 016.5 6.5z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11h8M8 14h6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 20a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 7V6a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 12H3M6 9l-3 3 3 3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* hover pill */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl px-2 py-1 cursor-pointer hover:bg-black/5 transition">
      {children}
    </span>
  );
}

export default function TopNav({ variant = "in" }: { variant?: "in" | "out" }) {
  const router = useRouter();

  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto w-full px-6 py-5 flex justify-between">

        {/* 좌측 */}
        <nav className="flex gap-10 text-gray-900">
          {/* 지도 */}
          <button
            onClick={() => router.push(isLoggedInClient() ? "/logout" : "/login")}
            className="flex flex-col items-center gap-1 hover:opacity-80"
          >
            <IconMap />
            <span className="text-xs">행사 지도</span>
          </button>

          {/* 달력 */}
          <button
            onClick={() =>
              router.push(
                isLoggedInClient()
                  ? "/logout/logout_calendar"
                  : "/login/login_calendar"
              )
            }
            className="flex flex-col items-center gap-1 hover:opacity-80"
          >
            <IconCalendar />
            <span className="text-xs">행사 달력</span>
          </button>

          {/* 게시판 */}
          <button
            onClick={() =>
              router.push(
                isLoggedInClient()
                  ? "/logout/logout_board"
                  : "/login/login_board"
              )
            }
            className="flex flex-col items-center gap-1 hover:opacity-80"
          >
            <IconBoard />
            <span className="text-xs">행사 게시판</span>
          </button>
        </nav>

        {/* 우측 */}
        {variant === "out" ? (
          <div className="flex gap-8">
            <Link href="/join"><Pill>회원가입</Pill></Link>
            <Link href="/signup"><Pill>로그인</Pill></Link>
          </div>
        ) : (
          <div className="flex gap-8">
            <Link href="/logout">
              <Pill>
                <IconUser /> 마이페이지
              </Pill>
            </Link>

            <button
              onClick={async () => {
                await fetch("/api/session/logout", { method: "POST" });
                router.push("/login");
              }}
            >
              <Pill>
                <IconLogout /> 로그아웃
              </Pill>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}


