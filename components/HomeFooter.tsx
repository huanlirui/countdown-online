"use client";

import { useTranslations } from "next-intl";

export function HomeFooter() {
  const footer = useTranslations("Footer");
  return (
    <div>
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
