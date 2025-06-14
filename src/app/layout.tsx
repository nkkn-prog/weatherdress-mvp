import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WeatherDress - 毎朝の服装選びをスマートに",
  description: "天気に合わせたパーソナル服装レコメンドサービス。毎朝の服装選びの悩みから解放され、自信を持って一日をスタート。",
  keywords: ["weather", "fashion", "outfit", "recommendation", "clothing", "天気", "服装", "コーディネート"],
  authors: [{ name: "WeatherDress Team" }],
  openGraph: {
    title: "WeatherDress - 毎朝の服装選びをスマートに",
    description: "天気に合わせたパーソナル服装レコメンドサービス",
    type: "website",
    locale: "ja_JP",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#3b82f6",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WeatherDress" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
