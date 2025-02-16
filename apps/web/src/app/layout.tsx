"use client";
import type { Metadata } from "next";
import cn from "@acme/utils/cn";
import "./globals.css";

import { trpcClient, trpc } from "@acme/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import { useState } from "react";

export const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Simple Buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-screen bg-gray-900 text-white antialiased",
          inter.className,
        )}
      >
        <QueryClientProvider client={queryClient}>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            {children}
          </trpc.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
