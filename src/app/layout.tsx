import type { Metadata } from "next";
import { App } from "antd";
import { Noto_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import NavigationBar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/styles/globals.css";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FJKT48",
  description: "JKT48 Fans Web",
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
        <App>
          <NextTopLoader color="#E53935" showSpinner={false} />
          <main className="flex flex-col min-h-screen bg-slate-100 text-black">
            <NavigationBar />
            {children}
            <Footer />
          </main>
        </App>
      </body>
    </html>
  );
}
