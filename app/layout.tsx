import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createMetadata } from "@/lib/metadata";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = createMetadata({
  title: "SubscribeMeForAI - AI学习平台",
  description: "专业的AI学习平台，提供精选的AI资源和课程，帮助您掌握人工智能技术",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geist.className} font-sans liquid-backdrop`}>
        <TRPCProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
