import crypto from "crypto";

const OTP_LENGTH = 6;
const OTP_EXPIRY = 10 * 60 * 1000; // 10 menit

export interface OTPData {
  otp: string;
  expiresAt: number;
}

export function generateOTP(): OTPData {
  const otp = crypto
    .randomInt(100000, 999999)
    .toString()
    .padStart(OTP_LENGTH, "0");
  const expiresAt = Date.now() + OTP_EXPIRY;
  return { otp, expiresAt };
}
