import type { Metadata } from "next";
import { AboutMetadata } from "@/common/seo-metadata";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = AboutMetadata;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
