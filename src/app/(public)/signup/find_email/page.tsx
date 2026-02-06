"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MohengLogo from "@/components/MohengLogo";

export default function FindEmailPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }

    // 지금은 임시 처리
    alert("입력하신 정보로 이메일을 조회했습니다.\n(test@test.com)");
    router.back();
  };

  return (
    <main className="min-h-[100svh] flex justify-center pt-20 px-6 bg-white">
      <div className="w-full max-w-[360px] text-center">

        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <MohengLogo width={120} height={48} />
        </div>

        <h1 className="text-base font-semibold mb-6 text-left">이메일 찾기</h1>

        <form onSubmit={submit} className="space-y-4 text-left">

          <div>
            <label className="text-sm block mb-1">이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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

            <button
              type="button"
              className="h-9 px-3 rounded bg-[#F7B23B] text-xs font-semibold whitespace-nowrap"
            >
              본인 인증
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-12 bg-[#F7B23B] rounded-md font-semibold text-sm"
          >
            이메일 찾기
          </button>
        </form>
      </div>
    </main>
  );
}

