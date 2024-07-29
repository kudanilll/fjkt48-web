import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb/client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("banner");
    const collection = db.collection("home");
    const data = await collection.find({}).toArray();
    if (!data || data.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "Not Found",
        content: [],
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Success",
      content: data,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
