import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FJKT48 | Register",
  description:
    "Create a new FJKT48 account to join our community and access exclusive content.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
