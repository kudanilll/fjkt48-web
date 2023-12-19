import { NextResponse, NextRequest } from "next/server";
import { banner, list } from "./news.json";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 200,
    message: "Success",
  });
}