import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/PageWrapper";

export const metadata: Metadata = {
  title: "FJKT48 | Member",
  description: "Daftar Member & Trainee JKT48",
};

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
