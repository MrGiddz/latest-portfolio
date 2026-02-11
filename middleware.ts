import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host") || "";
  const host = request.headers.get("host") || "";
  const rawHost = (forwardedHost || host).split(",")[0]?.trim() || "";
  const hostWithoutPort = rawHost.split(":")[0].toLowerCase();
  const configuredHosts = (process.env.ADMIN_HOSTS || "admin.mideolaniyi.com")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const isAdminSubdomain = configuredHosts.includes(hostWithoutPort);

  if (!isAdminSubdomain) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (pathname === "/" || !pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
