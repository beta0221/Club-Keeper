import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import { ClerkProvider } from '@clerk/nextjs';
import "../globals.scss";
import { Providers } from "@/components/providers";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          <ClerkProvider>
            <main className="min-h-screen bg-background">
              {children}
            </main>
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  );
}
