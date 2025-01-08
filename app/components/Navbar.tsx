"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "zh" : "en";
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const newPathname = segments.join("/");
    router.push(newPathname);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-xl font-bold">
              {t("title")}
            </Link>
          </div>
          <button onClick={switchLocale} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
            {t("switchLang")}
          </button>
        </div>
      </div>
    </nav>
  );
}
