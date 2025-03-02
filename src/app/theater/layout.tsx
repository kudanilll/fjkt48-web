import type { Metadata } from "next";
import { TheaterMetadata } from "@/common/seo-metadata";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = TheaterMetadata;

export default function TheaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
