import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("moheng_logged_in", "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: false, // (현재는 client에서도 읽어야 해서 false)
  });

  return res;
}

