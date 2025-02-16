import type { Metadata } from "next";
import cn from "@acme/utils/cn";
import "./globals.css";

import { Inter } from "next/font/google";

// Choose the fonts and weights you need.  For example:
export const inter = Inter({ subsets: ["latin"] });

// If you want a display font for headings and another for body:

export const metadata: Metadata = {
  title: "Simple Buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-screen bg-gray-900 text-white antialiased",
          inter.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
