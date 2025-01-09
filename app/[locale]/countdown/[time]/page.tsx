import { CountdownTimer } from "@/components/CountdownTimer";
import { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";

interface Props {
  params: Promise<{
    time: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { time } = await params;
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

  return {
    title: `${timeDescription} Countdown | Online Timer Tool`,
    description: `Precise ${timeDescription} online countdown timer for exams, meetings, events, and more. Features fullscreen mode, custom themes, and sound alerts.`,
    keywords: `countdown timer, online timer, ${timeDescription} timer, exam timer, meeting countdown, event timer, fullscreen timer, custom countdown`,
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
      title: `${timeDescription} Countdown | Online Timer Tool`,
      description: `Precise ${timeDescription} online countdown timer for exams, meetings, events, and more.`,
      type: 'website',
      locale: 'en_US',
      siteName: 'Online Timer Tool',
      url: `https://countdown-online.com/countdown/${time}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${timeDescription} Countdown | Online Timer Tool`,
      description: `Precise ${timeDescription} online countdown timer for exams, meetings, events, and more.`,
    },
    alternates: {
      canonical: `https://countdown-online.com/countdown/${time}`,
    },
    authors: [{ name: 'Online Timer Tool' }],
    category: 'Productivity Tools',
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
    "name": "Online Timer Tool",
    "description": "Professional online countdown timer for precise timing needs",
    "url": "https://countdown-online.com",
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Fullscreen mode",
      "Custom themes",
      "Sound alerts",
      "Multiple language support",
      "Custom text",
      "Precise timing"
    ]
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <CountdownTimer initialSeconds={seconds} />
    </>
  );
}
