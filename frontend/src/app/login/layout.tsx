import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Here you can auth your account",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
