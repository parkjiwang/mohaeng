import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isLoggedIn(req: NextRequest) {
  const hasAccessToken = Boolean(req.cookies.get("moheng_access_token")?.value);
  const hasLegacyFlag = req.cookies.get("moheng_logged_in")?.value === "1";

  return hasAccessToken || hasLegacyFlag;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = isLoggedIn(req);

  /**
   * ✅ 1) 로그인 전용(보호) 라우트
   * - 로그인 상태에서만 들어갈 수 있는 페이지들
   */
  const protectedPrefixes = ["/logout", "/region"];
  const isProtected = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // 로그인 안 했는데 보호 페이지 접근 → /login(게스트 홈)으로
  if (!loggedIn && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  /**
   * ✅ 2) 게스트 전용(로그인하면 못 들어감) 라우트
   * - 너의 규칙: 로그인하면 /login(게스트 홈) /signup(로그인 폼) /join(회원가입) 쪽은 막고 /logout으로 보냄
   */
  const guestOnlyPrefixes = ["/login", "/signup", "/join"];
  const isGuestOnly = guestOnlyPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (loggedIn && isGuestOnly) {
    const url = req.nextUrl.clone();
    url.pathname = "/logout";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * ✅ 미들웨어 적용 범위
 * - 정적 파일/이미지/API 제외
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|geo).*)"],
};

