"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export function CustomCountdownForm() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const t = useTranslations("CustomTime");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("15");
  const [seconds, setSeconds] = useState("");

  const handlePreset = (h: number, m: number, s: number) => {
    setHours(h.toString());
    setMinutes(m.toString());
    setSeconds(s.toString());
  };

  const handleAddTime = (h: number, m: number, s: number) => {
    const newHours = parseInt(hours || "0") + h;
    const newMinutes = parseInt(minutes || "0") + m;
    const newSeconds = parseInt(seconds || "0") + s;

    setHours(newHours.toString());
    setMinutes(newMinutes.toString());
    setSeconds(newSeconds.toString());
  };

  const handleStart = () => {
    const totalSeconds = parseInt(hours || "0") * 3600 + parseInt(minutes || "0") * 60 + parseInt(seconds || "0");

    if (totalSeconds > 0) {
      router.push(`/${locale}/countdown/${totalSeconds}`);
    }
  };

  const handleReset = () => {
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">{t("customTitle")}</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleReset}
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            {t("reset")}
          </Button>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">{t("presetTimes")}</h2>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handlePreset(0, 1, 0)}>
                1{t("minutesLabel")}
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 3, 0)}>
                3{t("minutesLabel")}
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 5, 0)}>
                5{t("minutesLabel")}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handlePreset(0, 10, 0)}>
                10{t("minutesLabel")}
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 15, 0)}>
                15{t("minutesLabel")}
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 30, 0)}>
                30{t("minutesLabel")}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handlePreset(1, 0, 0)}>
                1{t("hoursLabel")}
              </Button>
              <Button variant="outline" onClick={() => handlePreset(2, 0, 0)}>
                2{t("hoursLabel")}
              </Button>
              <Button variant="outline" onClick={() => handlePreset(4, 0, 0)}>
                4{t("hoursLabel")}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">{t("quickAdjust")}</h2>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="secondary" onClick={() => handleAddTime(0, 5, 0)}>
                {t("add5min")}
              </Button>
              <Button variant="secondary" onClick={() => handleAddTime(0, 15, 0)}>
                {t("add15min")}
              </Button>
              <Button variant="secondary" onClick={() => handleAddTime(0, 30, 0)}>
                {t("add30min")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t("hoursLabel")}</label>
              <Input
                type="number"
                min="0"
                value={hours}
                onChange={e => setHours(e.target.value)}
                placeholder="0"
                className="text-lg h-12 [&::-webkit-inner-spin-button]:w-12 [&::-webkit-inner-spin-button]:h-6 [&::-webkit-inner-spin-button]:m-1 [&::-webkit-inner-spin-button]:cursor-pointer [&::-webkit-inner-spin-button]:opacity-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("minutesLabel")}</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={e => setMinutes(e.target.value)}
                placeholder="0"
                className="text-lg h-12 [&::-webkit-inner-spin-button]:w-12 [&::-webkit-inner-spin-button]:h-6 [&::-webkit-inner-spin-button]:m-1 [&::-webkit-inner-spin-button]:cursor-pointer [&::-webkit-inner-spin-button]:opacity-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("secondsLabel")}</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={e => setSeconds(e.target.value)}
                placeholder="0"
                className="text-lg h-12 [&::-webkit-inner-spin-button]:w-12 [&::-webkit-inner-spin-button]:h-6 [&::-webkit-inner-spin-button]:m-1 [&::-webkit-inner-spin-button]:cursor-pointer [&::-webkit-inner-spin-button]:opacity-100"
              />
            </div>
          </div>

          <Button className="w-full h-12 text-lg mt-4" size="lg" onClick={handleStart}>
            {t("startCountdown")}
          </Button>
        </div>
      </Card>
    </div>
  );
} 