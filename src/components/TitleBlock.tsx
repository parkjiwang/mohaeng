"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function isLoggedInClient() {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("moheng_logged_in=1");
}

export default function TitleBlock({
  title = "- 모두의 모든 행사 -",
  desc = "원하는 지역 클릭 시 그 지역의 행사 게시판으로 이동합니다.",
  logoWidth = 140,
  logoHeight = 56,
}: {
  title?: string;
  desc?: string;
  logoWidth?: number;
  logoHeight?: number;
}) {
  const router = useRouter(); // ✅ 반드시 컴포넌트 안

  return (
    <div className="text-center mb-4">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const to = isLoggedInClient() ? "/logout" : "/login";
            router.push(to);
          }}
          className="inline-block hover:opacity-90 transition cursor-pointer"
        >
          <Image
            src="/images/moheng.png"
            alt="모행"
            width={logoWidth}
            height={logoHeight}
            priority
          />
        </button>
      </div>

      <div className="mt-1 text-lg font-semibold text-gray-800">{title}</div>

      <div className="mt-1 text-xs text-gray-600">{desc}</div>
    </div>
  );
}
