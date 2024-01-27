import { NextResponse, NextRequest } from "next/server";
import {
  retrieveData,
  retrieveCollectionDataById,
} from "@/lib/firebase/service";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (date) {
    const data = await retrieveCollectionDataById("schedule", date);
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
    content: await retrieveData("schedule"),
  });
}
