import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import NavigationBar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "./providers";
import "@/styles/globals.css";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
  authors: [
    {
      name: "Achmad Daniel Syahputra",
      url: "https://github.com/achmaddaniel24",
    },
    { name: "Muhammad Ikhsan Fauzi", url: "https://dribbble.com/ipauscream" },
  ],
  keywords: ["jkt48", "idol", "jkt"],
};

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
      <body className={noto.className}>
        <Providers>
          <nav>
            <NextTopLoader color="#E53935" showSpinner={false} />
            <NavigationBar />
          </nav>
          <main className="flex flex-col min-h-screen bg-red-50 text-black">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
