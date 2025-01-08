/*
 * @Description:
 */
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Error() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const t = useTranslations("Error");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push(`/${locale}`)} variant="outline">
            {t("backHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}
