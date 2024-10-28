import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("member");
  if (id) {
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
