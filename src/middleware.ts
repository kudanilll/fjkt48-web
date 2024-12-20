import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "@/lib/rate-limitter";

if (!process.env.API_KEY) {
  throw new Error("API Key is not defined");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) return rateLimitMiddleware(req);

  const apiKey = process.env.API_KEY;
  console.log(apiKey);
  if (pathname.startsWith("/api")) {
    if (req.headers.get("x-api-key") !== apiKey) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }
  }

  if (pathname === "/") return NextResponse.redirect(new URL("/home", req.url));
  return NextResponse.next();
}

export const config = {};
