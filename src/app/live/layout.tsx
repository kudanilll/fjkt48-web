import type { Metadata } from "next";
import { LiveMetadata } from "@/common/seo-metadata";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = LiveMetadata;

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
