import { startRegister } from "@/services/auth/service";
import { sendVerificationEmail } from "@/services/email/sender";
import { generateOTP } from "@/utils/otp";
import { NextResponse, NextRequest } from "next/server";
import isEmail from "validator/lib/isEmail";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!isEmail(email))
    return NextResponse.json({ message: "email not valid" }, { status: 400 });

  const otp = generateOTP();
  const pendingUser = {
    name,
    email,
    password,
  };

  await startRegister(pendingUser, otp);
  await sendVerificationEmail(email, otp.otp);

  return NextResponse.json({ message: "otp sent to email" }, { status: 200 });
}
