import { NextResponse } from "next/server";
import officialData from "@/data/jkt48-official.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 20;

  let news = officialData.news || [];

  if (category) {
    news = news.filter(
      (n) => n.category.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    total: news.length,
    data: news.slice(0, limit),
  });
}
