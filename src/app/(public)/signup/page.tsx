"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import MohengLogo from "@/components/MohengLogo";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = email.trim().length > 0 && pw.trim().length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isValid) return;

    // ✅ (지금은 임시) 로그인 성공 처리: 세션 쿠키 세팅
    await fetch("/api/session/login", { method: "POST" });

    // ✅ middleware가 준 next가 있으면 그쪽으로, 없으면 /logout
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next ?? "/logout");
  };

  return (
    <main className="min-h-[100svh] flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-[340px]">
        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <MohengLogo width={120} height={48} />
        </div>

        {/* 폼 */}
        <form onSubmit={onSubmit} className="space-y-3">
          {/* 이메일 */}
          <div className="flex items-center gap-3">
            <label className="w-[92px] text-sm text-gray-800">이메일(ID)</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className="flex-1 h-10 rounded-md border border-gray-900/80 px-3 text-sm outline-none focus:border-gray-900"
              autoComplete="username"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center gap-3">
            <label className="w-[92px] text-sm text-gray-800">비밀번호</label>
            <input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onBlur={() => setTouched(true)}
              className="flex-1 h-10 rounded-md border border-gray-900/80 px-3 text-sm outline-none focus:border-gray-900"
              type="password"
              autoComplete="current-password"
            />
          </div>

          {/* 안내 문구 */}
          <div className="pt-6 text-center text-[12px] text-gray-700">
            <Link href="/signup/find_email" className="underline underline-offset-2">
              이메일 찾기
            </Link>
            {" | "}
            <Link href="/signup/find_password" className="underline underline-offset-2">
              비밀번호 찾기
            </Link>
          </div>

          {/* 에러 메시지 */}
          {touched && !isValid && (
            <div className="text-center text-[12px] text-red-500">이메일과 비밀번호를 입력해주세요.</div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="mt-3 w-full h-12 rounded-md bg-[#F7B23B] text-gray-900 font-semibold text-sm
                       hover:brightness-[0.98] active:brightness-[0.96] transition"
          >
            로그인
          </button>

          {/* 구글 로그인 */}
          <button
            type="button"
            onClick={() => alert("구글 로그인은 추후 연결 예정입니다.")}
            className="w-full h-12 rounded-md border border-[#F7B23B] text-gray-900 font-medium text-sm
                       hover:bg-[#F7B23B]/10 active:bg-[#F7B23B]/15 transition"
          >
            구글 계정으로 로그인
          </button>
        </form>
      </div>
    </main>
  );
}
