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
import { getTranslations } from "next-intl/server";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.countdown-online.com"),
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate")
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map(keyword => keyword.trim()),
    authors: [{ name: "ynxh666" }],
    creator: "ynxh666",
    publisher: "ynxh666",
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://www.countdown-online.com",
      siteName: t("siteName"),
      images: [
        {
          url: "/previewHome.jpg",
          width: 1200,
          height: 630,
          alt: t("previewImageAlt")
        }
      ],
      locale: locale,
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
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/previewHome.jpg"]
    },
    alternates: {
      canonical: "https://www.countdown-online.com"
    },
    category: t("category")
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Timer Tool",
    description: "Professional online countdown timer for precise timing needs",
    url: "https://www.countdown-online.com",
    applicationCategory: "Productivity Tools",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: ["Fullscreen mode", "Custom themes", "Sound alerts", "Multiple language support", "Custom text", "Precise timing"]
  };

  return (
    <html lang={locale}>
      <head>
        <JsonLd data={structuredData} />
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
