import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { AppNavBar } from "@/common/components/AppNavBar";
import type { Metadata } from "next";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grease Point",
  description: "Heavy equipment tracking: maintenance, repairs, and inventory.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <AppNavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
