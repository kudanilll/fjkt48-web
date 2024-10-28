import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = {
  title: "FJKT48 | Profile",
  description: "Profile",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
