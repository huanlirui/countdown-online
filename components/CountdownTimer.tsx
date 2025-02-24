/*
 * @Description:
 */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { useFullscreen } from "@/hooks/useFullscreen";
import { ThemeSelector } from "./ThemeSelector";
import { Theme, defaultThemes } from "@/config/themes";
import { Settings, ArrowUpDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { CustomTextEditor } from "./CustomTextEditor";
import { useTranslations } from "next-intl";

interface CountdownTimerProps {
  initialSeconds: number;
  customText?: string;
}

export function CountdownTimer({ initialSeconds, customText = "" }: CountdownTimerProps) {
  const t = useTranslations("Countdown");
  const tCustomText = useTranslations("CustomText");
  const defaultText = customText ? customText : tCustomText("defaultCustomText");
  const router = useRouter();
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
  const [showControls, setShowControls] = useState(false);
  const [fontSize, setFontSize] = useState(144);
  const [customTextSize, setCustomTextSize] = useState(60);
  const isDragging = useRef(false);
  const isDraggingCustomText = useRef(false);
  const lastY = useRef(0);
  const [showFirstVisitAlert, setShowFirstVisitAlert] = useState(false);
  const [currentCustomText, setCurrentCustomText] = useState(defaultText);
  const [hasPlayedAlertSound, setHasPlayedAlertSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("currentTheme", JSON.stringify(theme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("currentTheme");
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        if (
          parsedTheme &&
          typeof parsedTheme === "object" &&
          "id" in parsedTheme &&
          "name" in parsedTheme &&
          "background" in parsedTheme &&
          "text" in parsedTheme &&
          "buttonPrimary" in parsedTheme &&
          "buttonSecondary" in parsedTheme
        ) {
          setCurrentTheme(parsedTheme);
        }
      } catch (error) {
        console.error("Error parsing saved theme:", error);
      }
    }
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/timeEnd.mp3");
  }, []);

  const playAlertSound = useCallback(async () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }
    } catch {
      setShowAlert(true);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 6 && !hasPlayedAlertSound) {
            playAlertSound();
            setHasPlayedAlertSound(true);
          }
          if (prev <= 1) {
            setIsRunning(false);
            setShowAlert(true);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, hasPlayedAlertSound, playAlertSound]);

  useEffect(() => {
    if (!isRunning) {
      setHasPlayedAlertSound(false);
    }
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleMouseDown = (e: React.MouseEvent, isCustomText: boolean) => {
    if (isCustomText) {
      isDraggingCustomText.current = true;
    } else {
      isDragging.current = true;
    }
    lastY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current && !isDraggingCustomText.current) return;

    const deltaY = lastY.current - e.clientY;

    if (isDraggingCustomText.current) {
      const newSize = Math.max(20, Math.min(200, customTextSize + deltaY));
      setCustomTextSize(newSize);
      localStorage.setItem("customTextSize", String(newSize));
    } else if (isDragging.current) {
      const newSize = Math.max(40, Math.min(300, fontSize + deltaY));
      setFontSize(newSize);
      localStorage.setItem("timerFontSize", String(newSize));
    }

    lastY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isDraggingCustomText.current = false;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("timerFontSize");
    if (savedFontSize) {
      setFontSize(Number(savedFontSize));
    } else {
      // 根据屏幕宽度设置默认字体大小
      const width = window.innerWidth;
      if (width < 768) { // 移动端
        setFontSize(72);
      } else {
        setFontSize(144);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const hasShownAlert = sessionStorage.getItem("hasShownFirstVisitAlert");
      if (!hasShownAlert) {
        setShowFirstVisitAlert(true);
        sessionStorage.setItem("hasShownFirstVisitAlert", "true");
      }
    }, 500);
  }, []);

  const onCustomTextChange = (newText: string) => {
    setCurrentCustomText(newText);
  };

  const handleCloseAlert = () => {
    setShowFirstVisitAlert(false);
    sessionStorage.setItem("hasShownFirstVisitAlert", "true");
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleControls = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (isMobile) {
      setShowControls(prev => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative" style={{ backgroundColor: currentTheme.background }}>
      {showFirstVisitAlert && (
        <Alert
          className={cn(
            "absolute top-2 right-1/2 transform translate-x-1/2",
            "w-auto",
            "bg-white dark:bg-zinc-950",
            "text-zinc-950 dark:text-zinc-50",
            "border border-zinc-200 dark:border-zinc-800",
            "shadow-md",
            "flex justify-center items-center pr-0"
          )}
        >
          <AlertDescription className="flex items-center justify-center mx-2">
            <ArrowUpDown className="h-4 w-4" />
            <span className="mx-2">{t("firstVisitTip")}</span>
            <Button variant="ghost" size="sm" className="ml-2 h-4 hover:bg-transparent" onClick={handleCloseAlert}>
              <X className="h-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {currentCustomText && (
        <CustomTextEditor
          text={currentCustomText}
          fontSize={customTextSize}
          theme={currentTheme}
          onTextChange={onCustomTextChange}
          onFontSizeChange={setCustomTextSize}
        />
      )}

      <div className="text-center relative">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div
              className="font-mono cursor-ns-resize select-none"
              style={{
                color: currentTheme.text,
                fontSize: `${fontSize}px`
              }}
              onMouseDown={e => handleMouseDown(e, false)}
              onMouseMove={handleMouseMove}
            >
              {formatTime(seconds)}
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            align="center"
            className={cn(
              "w-auto",
              "bg-white dark:bg-zinc-950",
              "text-zinc-950 dark:text-zinc-50",
              "border border-zinc-200 dark:border-zinc-800",
              "data-[state=open]:animate-in",
              "data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0",
              "data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95",
              "data-[state=open]:zoom-in-95",
              "data-[side=right]:slide-in-from-left-2",
              "shadow-md",
              "relative",
              "before:absolute before:w-3 before:h-3 before:rotate-45",
              "before:left-[-6px]",
              "before:top-[50%] before:translate-y-[-50%]",
              "before:border-l before:border-b",
              "before:border-zinc-200 dark:before:border-zinc-800",
              "before:bg-white dark:before:bg-zinc-950"
            )}
            sideOffset={8}
          >
            <div className="relative">
              <div className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4 opacity-80" />
                <span className="text-sm font-medium whitespace-nowrap">{t("dragToResize")}</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {!isRunning && (
          <Button
            size="lg"
            style={{
              backgroundColor: currentTheme.buttonPrimary,
              fontSize: "1.5rem",
              padding: "1.5rem 3rem",
              color: currentTheme.background
            }}
            className="hover:opacity-90 transition-opacity mt-8"
            onClick={() => setIsRunning(true)}
            disabled={seconds <= 0}
          >
            {t("start")}
          </Button>
        )}
      </div>

      <div 
        className="fixed top-4 right-4 z-50" 
        onMouseEnter={() => !isMobile && setShowControls(true)} 
        onMouseLeave={() => !isMobile && setShowControls(false)}
      >
        <div
          className={`absolute right-0 flex gap-2 items-center transition-all duration-300 ${
            showControls ? "opacity-100 translate-x-0 block" : "opacity-0 translate-x-8 hidden"
          }`}
        >
          {isMobile && (
            <Button
              size="sm"
              variant="ghost"
              className="hover:opacity-90 transition-opacity p-0 h-6 w-6"
              onClick={toggleControls}
            >
              <X className="h-4 w-4" style={{ color: currentTheme.text }} />
            </Button>
          )}
          {isRunning && (
            <Button
              size="sm"
              style={{
                backgroundColor: currentTheme.buttonPrimary,
                color: currentTheme.background
              }}
              className="hover:opacity-90 transition-opacity"
              onClick={() => setIsRunning(false)}
            >
              {t("pause")}
            </Button>
          )}
          <Button
            size="sm"
            style={{
              backgroundColor: currentTheme.buttonSecondary
            }}
            className="hover:opacity-90 transition-opacity"
            onClick={() => {
              setSeconds(initialSeconds);
              setIsRunning(false);
              setShowAlert(false);
            }}
          >
            {t("reset")}
          </Button>
          <Button
            size="sm"
            style={{
              backgroundColor: currentTheme.buttonSecondary
            }}
            className="hover:opacity-90 transition-opacity"
            onClick={() => router.push("/")}
          >
            {t("back")}
          </Button>
          <Button
            size="sm"
            style={{
              backgroundColor: currentTheme.buttonSecondary
            }}
            className="hover:opacity-90 transition-opacity"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? t("exitFullscreen") : t("fullscreen")}
          </Button>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
        </div>
        <Settings
          className={`w-6 h-6 cursor-pointer transition-opacity duration-300 ${showControls ? "hidden" : "block"}`}
          style={{ color: currentTheme.text }}
          onClick={toggleControls}
        />
      </div>

      {showAlert && (
        <div
          className="fixed top-16 right-4 p-4 rounded-md flex items-center gap-2"
          style={{
            backgroundColor: currentTheme.buttonPrimary,
            color: "white"
          }}
        >
          <span>{t("timeUp")}</span>
          <X className="h-4 w-4 cursor-pointer hover:opacity-80" onClick={() => setShowAlert(false)} />
        </div>
      )}
    </div>
  );
}
