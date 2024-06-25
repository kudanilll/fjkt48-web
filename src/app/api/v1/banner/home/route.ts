import { NextResponse, NextRequest } from "next/server";
import { retrieveDataById } from "@/lib/firebase/service";

export const dynamic = "force-dynamic";

export async function GET(_: NextRequest) {
  const data = await retrieveDataById("banner", "home");
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
