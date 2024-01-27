import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/PageWrapper";

export const metadata: Metadata = {
  title: "FJKT48 | Jadwal",
  description: "Daftar Jadwal Acara & Pertunjukan JKT48",
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
