"use client";
import { GlobalTheme } from "@/context/theme";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GlobalTheme>{children}</GlobalTheme>
    </SessionProvider>
  );
}
