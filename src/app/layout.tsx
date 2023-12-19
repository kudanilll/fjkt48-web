import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import "../assets/styles/globals.css";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'FJKT48',
  description: 'JKT48 adalah grup idola asal Indonesia dan grup saudari AKB48 yang pertama di luar Jepang.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen bg-gray-950 text-white">
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