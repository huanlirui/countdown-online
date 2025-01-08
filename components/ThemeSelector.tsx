"use client";

import { Button } from "./ui/button";
import { Theme, defaultThemes } from "@/config/themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useTranslations } from "next-intl";

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const t = useTranslations("Theme");

  // 预设的颜色方案
  const colorSchemes = [
    { id: "deepBlue", name: t("deepBlue"), primary: "#1e40af", secondary: "#3b82f6", background: "#eff6ff", text: "#1e3a8a" },
    { id: "forestGreen", name: t("forestGreen"), primary: "#166534", secondary: "#22c55e", background: "#f0fdf4", text: "#14532d" },
    { id: "elegantPurple", name: t("elegantPurple"), primary: "#5b21b6", secondary: "#8b5cf6", background: "#f5f3ff", text: "#4c1d95" },
    { id: "warmAmber", name: t("warmAmber"), primary: "#b45309", secondary: "#f59e0b", background: "#fffbeb", text: "#92400e" },
    { id: "romanticPink", name: t("romanticPink"), primary: "#be123c", secondary: "#f43f5e", background: "#fff1f2", text: "#9f1239" }
  ];

  const handleColorSelect = (colorScheme: (typeof colorSchemes)[0]) => {
    const newTheme: Theme = {
      id: `theme-${colorScheme.id}`,
      name: colorScheme.name,
      background: colorScheme.background,
      text: colorScheme.text,
      buttonPrimary: colorScheme.primary,
      buttonSecondary: colorScheme.secondary
    };
    onThemeChange(newTheme);
    localStorage.setItem("currentThemeId", newTheme.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("settings")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("selectTheme")}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
          {/* default themes */}
          <div>
            <Label className="mb-3 block">{t("defaultThemes")}</Label>
            <div className="grid grid-cols-2 gap-4">
              {defaultThemes.map(theme => (
                <div
                  key={theme.id}
                  className={`p-4 rounded-lg cursor-pointer border-2 
                    ${currentTheme.id === theme.id ? "border-primary" : "border-transparent"}`}
                  onClick={() => onThemeChange(theme)}
                >
                  <div
                    className="h-20 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: theme.background,
                      color: theme.text
                    }}
                  >
                    {t(theme.id)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* color schemes */}
          <div>
            <Label className="mb-3 block">{t("colorSchemes")}</Label>
            <div className="grid grid-cols-2 gap-4">
              {colorSchemes.map(scheme => (
                <div
                  key={scheme.id}
                  className={`p-4 rounded-lg cursor-pointer border-2 
                    ${currentTheme.id === `theme-${scheme.id}` ? "border-primary" : "border-transparent"}`}
                  onClick={() => handleColorSelect(scheme)}
                >
                  <div
                    className="h-20 rounded flex flex-col items-center justify-center gap-2"
                    style={{ backgroundColor: scheme.background }}
                  >
                    <span style={{ color: scheme.text }}>{scheme.name}</span>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.primary }} />
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.secondary }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
