import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const data = null;
  if (!data) {
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      error: "Not Found",
    });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
  }
  return NextResponse.json({
    status: 200,
    message: "Success",
    content: data,
  });
}
