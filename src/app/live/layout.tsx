import type { Metadata } from "next";
import { LiveMetadata } from "@/common/seo-metadata";

export const metadata: Metadata = LiveMetadata;

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
