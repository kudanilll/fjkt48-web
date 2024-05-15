import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const token = request.nextUrl.searchParams.get("token");
  if (!tag) {
    return NextResponse.json({ status: 400, error: "Missing tag param" });
  }
  if (!token) {
    return NextResponse.json({ status: 400, error: "Missing token param" });
  }
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ status: 401, error: "Invalid token" });
  }
  revalidateTag(tag);
  return NextResponse.json({
    status: 200,
    message: "Revalidate success",
    revalidate: true,
    date: Date.now(),
  });
}
