import * as React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthProvider from "@/providers/SessionProvider";

const myFont = localFont({
  src: "../fonts/FixelVariable.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student`s App",
  description: "Student`s App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
