import type { Metadata } from "next";
import { Sora } from "next/font/google";
import NavigationBar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/assets/styles/globals.css";

const sora = Sora({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "FJKT48",
  description: "JKT48 Fans Web"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <main className="flex flex-col min-h-screen bg-slate-100 text-black">
          <NavigationBar/>
          <div className="mt-12 px-5 sm:px-16">
            {children}
          </div>
          <Footer/>
        </main>
      </body>
    </html>
  );
}