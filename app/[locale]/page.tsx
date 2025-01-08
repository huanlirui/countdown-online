"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "../components/Navbar";

export default function Home() {
  const t = useTranslations("Index");
  const f = useTranslations("Features");
  const footer = useTranslations("Footer");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 mt-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">{t("heroTitle")}</h1>
        <p className="text-lg text-center text-muted-foreground mb-12">{t("heroSubtitle")}</p>

        {/* Quick Start Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <Link href="/countdown/3600">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">{t("oneHourTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("oneHourDesc")}</p>
            </Card>
          </Link>
          <Link href="/countdown/1800">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">{t("thirtyMinTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("thirtyMinDesc")}</p>
            </Card>
          </Link>
          <Link href="/countdown/custom">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">{t("customTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("customDesc")}</p>
            </Card>
          </Link>
        </div>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{f("fullscreen")}</h3>
            <p className="text-muted-foreground">{f("fullscreenDesc")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{f("themes")}</h3>
            <p className="text-muted-foreground">{f("themesDesc")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{f("sound")}</h3>
            <p className="text-muted-foreground">{f("soundDesc")}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">
          {footer("copyright", {
            year: new Date().getFullYear()
          })}
        </p>
      </footer>
    </div>
  );
}
