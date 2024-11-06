import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 3, // 3 requests
  duration: 60, // per 1 minute by IP
});

export async function rateLimitMiddleware(req: NextRequest) {
  try {
    await rateLimiter.consume(req.ip!);
    return NextResponse.next();
  } catch (error) {
    NextResponse.json({ status: 429, message: "Too Many Requests" });
  }
}
