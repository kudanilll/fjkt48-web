import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import NavigationBar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/styles/globals.css";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  // metadataBase: new URL(""),
  title: "FJKT48",
  description: "JKT48 Fans Web",
  openGraph: {
    title: "FJKT48",
    description: "JKT48 Fans Web",
    url: "https://fjkt48.vercel.app",
    siteName: "fjkt48.vercel.app",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}>
      <body className={noto.className}>
        <nav>
          <NextTopLoader color="#E53935" showSpinner={false} />
          <NavigationBar />
        </nav>
        <main className="flex flex-col min-h-screen bg-slate-100 text-black">
          {children}
        </main>
        <nav>
          <Footer />
        </nav>
      </body>
    </html>
  );
}
