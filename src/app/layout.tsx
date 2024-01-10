import type { Metadata } from "next";
import { Sora } from "next/font/google";
import NavigationBar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/assets/styles/globals.css";

const sora = Sora({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "FJKT48 | Home",
  description: "JKT48 Fans Web"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth" style={{scrollBehavior:"smooth"}}>
      <body className={sora.className}>
        <main className="flex flex-col min-h-screen bg-slate-100 text-black">
          <NavigationBar/>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  );
}