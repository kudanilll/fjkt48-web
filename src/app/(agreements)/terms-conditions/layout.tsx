import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FJKT48 | Terms & Conditions",
  description: "Terms & Conditions of JKT48",
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
