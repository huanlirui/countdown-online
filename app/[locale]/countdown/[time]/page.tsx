import { CountdownTimer } from "@/components/CountdownTimer";
import { Metadata, Viewport } from "next";
import JsonLd from "@/app/components/JsonLd";

interface Props {
  params: Promise<{
    time: string;
    locale: string;
  }>;
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { time, locale } = await params;
  const seconds = parseInt(time);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  let timeDescription = "";
  if (hours > 0) {
    timeDescription = `${hours} hours`;
  } else if (minutes > 0) {
    timeDescription = `${minutes} minutes`;
  } else {
    timeDescription = `${seconds} seconds`;
  }

  // 构建正确的 URL（默认语言不带前缀）
  const isDefaultLocale = locale === 'en';
  const baseUrl = 'https://www.countdown-online.com';
  const pathWithLocale = isDefaultLocale ? `/countdown/${time}` : `/${locale}/countdown/${time}`;
  const canonicalUrl = `${baseUrl}${pathWithLocale}`;

  return {
    title: `${timeDescription} Countdown | Online Timer Tool`,
    description: `Precise ${timeDescription} online countdown timer for exams, meetings, events, and more. Features fullscreen mode, custom themes, and sound alerts.`,
    keywords: `countdown timer, online timer, ${timeDescription} timer, exam timer, meeting countdown, event timer, fullscreen timer, custom countdown`,
    robots: "index, follow",
    openGraph: {
      title: `${timeDescription} Countdown | Online Timer Tool`,
      description: `Precise ${timeDescription} online countdown timer for exams, meetings, events, and more.`,
      type: "website",
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      siteName: "Online Timer Tool",
      url: canonicalUrl
    },
    twitter: {
      card: "summary_large_image",
      title: `${timeDescription} Countdown | Online Timer Tool`,
      description: `Precise ${timeDescription} online countdown timer for exams, meetings, events, and more.`
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/countdown/${time}`,
        'zh': `${baseUrl}/zh/countdown/${time}`,
        'x-default': `${baseUrl}/countdown/${time}`
      }
    },
    authors: [{ name: "Online Timer Tool" }],
    category: "Productivity Tools"
  };
}

export default async function CountdownPage({ params }: Props) {
  const { time } = await params;
  const seconds = parseInt(time);

  if (isNaN(seconds) || seconds < 0) {
    throw new Error("Invalid countdown time");
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Timer Tool",
    description: "Professional online countdown timer for precise timing needs",
    url: "https://countdown-online.com",
    applicationCategory: "Utility",
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
    <>
      <JsonLd data={structuredData} />
      <CountdownTimer initialSeconds={seconds} />
    </>
  );
}
