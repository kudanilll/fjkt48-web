import { NextResponse, NextRequest } from "next/server";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";

export async function GET(request: NextRequest) {
  const banner = request.nextUrl.searchParams.get("banner");
  if (banner) {
    const data = await retrieveDataById("shop", "banner");
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
    content: await retrieveData("shop"),
  });
}
