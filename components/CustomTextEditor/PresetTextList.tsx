"use client";

/*
 * @Description:
 */
import { Theme } from "@/config/themes";
import { useTranslations } from "next-intl";


interface PresetTextListProps {
  theme: Theme;
  onSelect: (text: string) => void;
}

export function PresetTextList({ onSelect }: PresetTextListProps) {
  const t = useTranslations("CustomText.presetTexts");
  const COUNTDOWN_TEXTS = [
    t("timeToStart"),
    t("timeToEnd"),
    t("activityStart"),
    t("activityEnd"),
    t("limitedOffer"),
    t("flashSaleStart"),
    t("purchaseEnd"),
    t("registrationEnd"),
    t("liveStart"),
    t("examCountdown"),
    t("releaseCountdown"),
    t("presaleStart")
  ];
  return (
    <div className="grid grid-cols-1 gap-2">
      {COUNTDOWN_TEXTS.map(text => (
        <button
          key={text}
          className="p-2 text-sm text-left rounded-md hover:bg-accent/50 transition-colors duration-200 border border-transparent hover:border-border"
          onClick={() => onSelect(text)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
