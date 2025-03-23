

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollLenis from "@/app/components/SmoothScrollLenis";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;


}>)

{

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SmoothScrollLenis />

          {children}

      </body>
    </html>
  );
}
