import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "@/lib/rate-limitter";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) return rateLimitMiddleware(req);

  if (req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/home", req.url));

  return NextResponse.next();
}

export const config = {};
