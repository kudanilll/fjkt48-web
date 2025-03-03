"use client";

import { GlobalTheme } from "@/context/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalTheme>{children}</GlobalTheme>;
}
