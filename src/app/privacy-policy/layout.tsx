import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FJKT48 | Privacy Policy",
  description: "Privacy Policy of JKT48",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
