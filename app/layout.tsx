import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createMetadata } from "@/lib/metadata";

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
        <meta name="theme-color" content="#f3f1ed" />
      </head>
      <body className="bg-background text-foreground">
        <TRPCProvider>
          <div className="home-page min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
