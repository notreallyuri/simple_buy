"use client";
import { cn } from "@acme/utils";
import "./globals.css";

import { trpcClient, trpc } from "@acme/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import { useState } from "react";

export const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 5 * 1000, refetchOnWindowFocus: false },
        },
      }),
  );

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
