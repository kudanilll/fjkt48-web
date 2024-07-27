import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb/client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("banner-home");
    const data = await collection.find({}).toArray();
    if (!data || data.length === 0) {
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
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
