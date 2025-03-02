import type { Metadata } from "next";
import { ScheduleMetadata } from "@/common/seo-metadata";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = ScheduleMetadata;

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
