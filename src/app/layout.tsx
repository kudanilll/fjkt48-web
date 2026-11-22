import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import TabBar from "@/components/layout/tab-bar";

const fontDisplay = localFont({
  src: "../../public/fonts/big-shoulders-display-variable.ttf",
  variable: "--font-display",
  display: "swap",
});

const fontSans = localFont({
  src: "../../public/fonts/geist-variable.ttf",
  variable: "--font-sans",
  display: "swap",
});

const fontMono = localFont({
  src: "../../public/fonts/geist-mono-variable.ttf",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FJKT48 : Portal Komunitas JKT48",
    template: "%s | FJKT48",
  },
  description:
    "Portal komunitas penggemar JKT48. Informasi jadwal teater, berita terkini, katalog member, dan ruang interaksi fans.",
  icons: {
    icon: "/icon-512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  try {
    var stored = localStorage.getItem('fjkt48-theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--bg)] text-[var(--ink)] selection:bg-crimson-500/30">
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <div className="flex-1 pb-16 md:pb-0">{children}</div>
            <Footer />
            <TabBar />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
