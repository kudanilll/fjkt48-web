import { NextResponse } from "next/server";
import officialData from "@/data/jkt48-official.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let schedules = officialData.schedules || [];

  if (type) {
    schedules = schedules.filter(
      (s) => s.type?.toLowerCase() === type.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    total: schedules.length,
    data: schedules,
  });
}
