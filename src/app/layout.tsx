import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth/AuthContext";

import Header from "@/components/Layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Blog</title>
      </head>
      <body>
        <AuthProvider>
          <Header />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
