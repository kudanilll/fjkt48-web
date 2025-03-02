import type { Metadata } from "next";
import { NewsMetadata } from "@/common/seo-metadata";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = NewsMetadata;

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
