import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (date) {
    const data = null;
    if (data) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        content: data,
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      content: {},
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Success",
    content: null,
  });
}
