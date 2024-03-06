import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/PageWrapper";

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
