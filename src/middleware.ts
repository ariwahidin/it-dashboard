import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "yusen-bi-super-secret-key-2024"
);
const COOKIE_NAME = "bi_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      session = payload;
    } catch {
      session = null;
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/login")) {
    if (session) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboards/:path*", "/login"],
};