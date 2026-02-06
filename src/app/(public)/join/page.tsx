"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import MohengLogo from "@/components/MohengLogo";


export default function JoinPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    agree: false,
  });

  const onChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.name || !form.phone || !form.agree) {
      alert("모든 항목을 입력하고 약관에 동의해주세요.");
      return;
    }

    // 지금은 그냥 가입 성공 처리
    router.push("/login");
  };

  return (
    <main className="min-h-[100svh] flex justify-center px-6 pt-16">
      <div className="w-full max-w-[360px] text-center">

        {/* 로고 */}
        <div className="flex justify-center mb-2">
          <MohengLogo width={120} height={48} />
        </div>

        <h1 className="text-xl font-semibold mb-1">회원가입</h1>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          모두의 모든 행사<br />
          모행에 오신 걸 환영합니다!<br />
          다양한 행사를 직접 만들고 경험 해보세요!
        </p>

        {/* 구글 */}
        <button className="w-full h-11 border border-[#F7B23B] rounded-md text-sm mb-4">
          구글 계정으로 간편 가입
        </button>

        <div className="text-xs text-gray-400 mb-3">──── 또는 ────</div>

        <form onSubmit={submit} className="space-y-3 text-left">

          <Field label="이메일(ID)">
            <input name="email" onChange={onChange} className="input" />
          </Field>

          <Field label="비밀번호">
            <input type="password" name="password" onChange={onChange} className="input" />
          </Field>

          <Field label="이름">
            <input name="name" onChange={onChange} className="input" />
          </Field>

          <div className="flex items-center gap-2">
            <label className="text-sm w-[70px]">전화번호</label>
            <input name="phone" onChange={onChange} className="input flex-1" />
            <button
              type="button"
              className="text-xs bg-[#F7B23B] px-2 py-1 rounded"
            >
              본인 인증
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs pt-2">
            <input type="checkbox" name="agree" onChange={onChange} />
            [필수] 개인정보 수집 및 이용 동의{" "}
            <Link
            href="/join/terms"
            className="text-blue-600 underline underline-offset-2 hover:opacity-80"
            >
            보기
            </Link>
          </label>

          <button
            type="submit"
            className="w-full h-11 bg-[#F7B23B] rounded-md font-semibold mt-3 mb-20"
          >
            회원 가입
          </button>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          height: 40px;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 0 10px;
          font-size: 14px;
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm w-[70px]">{label}</label>
      {children}
    </div>
  );
}
