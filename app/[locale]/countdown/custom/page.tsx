import { Metadata, Viewport } from "next";
import { CustomCountdownForm } from "@/components/CustomCountdownForm";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // 构建正确的 URL（默认语言不带前缀）
  const isDefaultLocale = locale === 'en';
  const baseUrl = 'https://www.countdown-online.com';
  const pathWithLocale = isDefaultLocale ? '/countdown/custom' : `/${locale}/countdown/custom`;
  const canonicalUrl = `${baseUrl}${pathWithLocale}`;

  return {
    title: "Custom Countdown | Online Timer Tool",
    description:
      "Create custom duration countdowns with precise hours, minutes, and seconds settings. Quick access to preset timers for convenient operation.",
    keywords: "custom countdown, timer creator, countdown generator, custom timer, online timer, countdown tool, timer settings",
    robots: "index, follow",
    openGraph: {
      title: "Custom Countdown | Online Timer Tool",
      description:
        "Create custom duration countdowns with precise hours, minutes, and seconds settings. Quick access to preset timers for convenient operation.",
      type: "website",
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      siteName: "Online Timer Tool",
      url: canonicalUrl
    },
    twitter: {
      card: "summary_large_image",
      title: "Custom Countdown | Online Timer Tool",
      description:
        "Create custom duration countdowns with precise hours, minutes, and seconds settings. Quick access to preset timers for convenient operation."
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/countdown/custom`,
        'zh': `${baseUrl}/zh/countdown/custom`,
        'x-default': `${baseUrl}/countdown/custom`
      }
    },
    authors: [{ name: "Online Timer Tool" }],
    category: "Productivity Tools"
  };
}

export default function CustomCountdownPage() {
  return <CustomCountdownForm />;
}
