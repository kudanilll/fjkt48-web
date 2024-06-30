import { NextResponse, NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  const data = null;
  if (!data) {
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      error: "Not Found",
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Success",
    content: data,
  });
}
