import { Metadata } from "next";
import { CustomCountdownForm } from "@/components/CustomCountdownForm";

export const metadata: Metadata = {
  title: "Custom Countdown | Online Timer Tool",
  description: "Create custom duration countdowns with precise hours, minutes, and seconds settings. Quick access to preset timers for convenient operation.",
  keywords: "custom countdown, timer creator, countdown generator, custom timer, online timer, countdown tool, timer settings",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Custom Countdown | Online Timer Tool",
    description: "Create custom duration countdowns with precise hours, minutes, and seconds settings. Quick access to preset timers for convenient operation.",
    type: "website",
    locale: "en_US",
    siteName: "Online Timer Tool",
    url: "https://countdown-online.com/countdown/custom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Countdown | Online Timer Tool",
    description: "Create custom duration countdowns with precise hours, minutes, and seconds settings. Quick access to preset timers for convenient operation.",
  },
  alternates: {
    canonical: "https://countdown-online.com/countdown/custom",
  },
  authors: [{ name: "Online Timer Tool" }],
  category: "Productivity Tools",
};

export default function CustomCountdownPage() {
  return <CustomCountdownForm />;
}
