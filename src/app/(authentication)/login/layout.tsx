import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FJKT48 | Login",
  description:
    "Login to your FJKT48 account to access exclusive content and features.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
