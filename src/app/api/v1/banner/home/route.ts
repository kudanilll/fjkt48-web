import { clientPromise } from "@/lib/mongodb/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const data = await client
      .db("banner")
      .collection("home")
      .find({})
      .toArray();
    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          message: "Not Found",
          content: [],
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Success",
        content: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
