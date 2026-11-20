import { NextResponse } from "next/server";
import officialData from "@/data/jkt48-official.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const query = searchParams.get("q");

  let members = officialData.members || [];

  if (type) {
    members = members.filter(
      (m) => m.type.toUpperCase() === type.toUpperCase()
    );
  }

  if (query) {
    const q = query.toLowerCase();
    members = members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: members.length,
    data: members,
  });
}
