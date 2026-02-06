"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MohengLogo from "@/components/MohengLogo";

export default function FindPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone) {
      alert("이메일(ID)과 전화번호를 입력해주세요.");
      return;
    }

    // 지금은 임시 처리
    alert("본인 확인이 완료되었습니다.\n(다음 단계: 비밀번호 재설정)");
    router.back();
  };

  return (
    <main className="min-h-[100svh] flex justify-center pt-20 px-6 bg-white">
      <div className="w-full max-w-[360px] text-center">
        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <MohengLogo width={120} height={48} />
        </div>

        <h1 className="text-base font-semibold mb-6 text-left">비밀번호 찾기</h1>

        <form onSubmit={submit} className="space-y-4 text-left">
          <div>
            <label className="text-sm block mb-1">이메일(ID)</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 border border-gray-900 rounded-md px-3 text-sm"
            />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-sm block mb-1">전화번호</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 border border-gray-900 rounded-md px-3 text-sm"
              />
            </div>

            <button type="button" className="h-9 px-3 rounded bg-[#F7B23B] text-xs font-semibold whitespace-nowrap">
              본인 인증
            </button>
          </div>

          <button type="submit" className="mt-6 w-full h-12 bg-[#F7B23B] rounded-md font-semibold text-sm">
            비밀번호 찾기
          </button>
        </form>
      </div>
    </main>
  );
}


