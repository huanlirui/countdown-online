'use client';

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "zh" : "en";
    // 移除当前语言前缀并添加新的语言前缀
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <Button onClick={switchLocale} variant="outline" className="w-16">
      {locale === "en" ? "中文" : "EN"}
    </Button>
  );
}
