import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavigationBar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/assets/styles/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "FJKT48",
  description: "JKT48 Fans Web"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen bg-slate-100 text-black font-poppins">
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