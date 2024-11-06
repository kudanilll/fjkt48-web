import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FJKT48 | OTP Verification",
  description: "",
};

export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
