import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "../components/JsonLd";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "../../i18n";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.countdown-online.com"),
  title: {
    default: "倒计时工具 - 精确到秒的在线倒计时器",
    template: "%s | 倒计时工具"
  },
  description: "免费在线倒计时工具，支持多个倒计时同时进行，精确到秒，适用于考试、会议、活动等场景的时间管理。简单易用，无需下载安装。",
  keywords: ["倒计时", "在线倒计时器", "时间管理", "计时工具", "考试倒计时", "会议倒计时", "活动倒计时"],
  authors: [{ name: "ynxh666" }],
  creator: "ynxh666",
  publisher: "ynxh666",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: "倒计时工具 - 精确到秒的在线倒计时器",
    description: "免费在线倒计时工具，支持多个倒计时同时进行，精确到秒，适用于考试、会议、活动等场景的时间管理。",
    url: "https://www.countdown-online.com",
    siteName: "倒计时工具",
    images: [
      {
        url: "/previewHome.jpg",
        width: 1200,
        height: 630,
        alt: "倒计时工具预览图"
      }
    ],
    locale: "zh",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "倒计时工具 - 精确到秒的在线倒计时器",
    description: "免费在线倒计时工具，支持多个倒计时同时进行，精确到秒。",
    images: ["/previewHome.jpg"]
  },
  alternates: {
    canonical: "https://www.countdown-online.com"
  },
  category: "工具软件"
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <SpeedInsights />
          <Analytics />
          <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-WQJLE8SJ6G" />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WQJLE8SJ6G');
              `
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
