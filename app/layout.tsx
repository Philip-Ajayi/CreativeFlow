import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import CursorGlow from "@/components/cursor-glow";

// Define Akrobat (Default site-wide font)
const akrobat = localFont({
  src: [
    {
      path: "../public/fonts/Akrobat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Akrobat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Akrobat-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-akrobat",
  display: "swap",
});

// Define Acoustic (Service title font)
const acoustic = localFont({
  src: [
    {
      path: "../public/fonts/BrittanySignature.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-acoustic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreeFlow Creative Hub — Ideas in Motion",
  description:
    "FreeFlow Creative Hub builds brands, publishes ideas and develops the next generation of creatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${akrobat.variable} ${acoustic.variable}`}>
      <body className="noise">
        <SmoothScroll />
        <CursorGlow />
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
