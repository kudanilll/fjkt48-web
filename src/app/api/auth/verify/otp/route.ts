import { register } from "@/services/auth/actions";
import {
  deletePendingUserByEmail,
  getPendingUserByEmail,
} from "@/services/auth/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  const pendingUser = await getPendingUserByEmail(email);
  if (!pendingUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const currentTime = new Date();
  if (pendingUser.otpExpires < currentTime) {
    return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
  }

  if (pendingUser.otp !== otp) {
    return NextResponse.json({ message: "invalid OTP" }, { status: 400 });
  }

  const res = await register({
    email: pendingUser.email,
    password: pendingUser.password,
    name: pendingUser.name,
    image: "",
    createdAt: new Date(),
  });
  if (res.error)
    return NextResponse.json({ message: res.message }, { status: 400 });
  if (res) await deletePendingUserByEmail(email);
  return NextResponse.json({ message: "account verified" }, { status: 200 });
}
