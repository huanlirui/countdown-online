"use client";

import { Button } from "./ui/button";
import { Theme, defaultThemes } from "@/config/themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

// 预设的颜色方案
const colorSchemes = [
  { id: "blue", name: "深邃蓝", primary: "#1e40af", secondary: "#3b82f6", background: "#eff6ff", text: "#1e3a8a" },
  { id: "green", name: "森林绿", primary: "#166534", secondary: "#22c55e", background: "#f0fdf4", text: "#14532d" },
  { id: "purple", name: "典雅紫", primary: "#5b21b6", secondary: "#8b5cf6", background: "#f5f3ff", text: "#4c1d95" },
  { id: "amber", name: "温暖橙", primary: "#b45309", secondary: "#f59e0b", background: "#fffbeb", text: "#92400e" },
  { id: "rose", name: "浪漫粉", primary: "#be123c", secondary: "#f43f5e", background: "#fff1f2", text: "#9f1239" }
];

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
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
        <Button variant="outline">主题设置</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择主题色彩</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
          {/* 默认主题 */}
          <div>
            <Label className="mb-3 block">预设主题</Label>
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
                    {theme.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 颜色方案选择 */}
          <div>
            <Label className="mb-3 block">配色方案</Label>
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
