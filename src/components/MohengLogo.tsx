"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function isLoggedInClient() {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("moheng_logged_in=1");
}

export default function MohengLogo({
  width = 120,
  height = 48,
}: {
  width?: number;
  height?: number;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const to = isLoggedInClient() ? "/logout" : "/login";
        router.push(to);
      }}
      className="inline-block hover:opacity-90 transition cursor-pointer"
    >
      <Image src="/images/moheng.png" alt="모행" width={width} height={height} priority />
    </button>
  );
}
