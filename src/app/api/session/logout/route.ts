import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("moheng_logged_in", "0", {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    maxAge: 0,
  });

  return res;
}

