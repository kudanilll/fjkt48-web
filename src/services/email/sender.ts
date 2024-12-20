"use server";
import { emailTemplate } from "./template";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  email: string,
  otp: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verifikasi Email",
    html: emailTemplate(otp),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send verification email");
  }
}
