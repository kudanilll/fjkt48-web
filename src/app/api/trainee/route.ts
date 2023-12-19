import { NextResponse, NextRequest } from "next/server";
import { content } from "./trainee.json";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if(id) {
    const result = content.find((i) => i.id === Number(id));
    if(result) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        content: result
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      content: {}
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Success",
    content
  });
}