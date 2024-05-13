import { NextResponse, NextRequest } from "next/server";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const data = await retrieveDataById("news", id);
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
      error: "Not Found",
    });
  }
  const data = await retrieveData("news");
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
