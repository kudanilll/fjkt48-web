import type { Metadata } from "next";
import { SeoMetadata } from "@/seo/seo-metadata";
import NextTopLoader from "nextjs-toploader";
import NavigationBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Providers from "./providers";
import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

export const metadata: Metadata = SeoMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}>
      <body>
        <Providers>
          <header className="bg-red-100">
            <NextTopLoader color="#E53935" showSpinner={false} />
            <NavigationBar />
          </header>
          <main className="flex flex-col min-h-screen bg-red-50 text-black">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
