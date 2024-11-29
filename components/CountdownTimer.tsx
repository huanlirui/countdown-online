/*
 * @Description:
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { useFullscreen } from "@/hooks/useFullscreen";
import { ThemeSelector } from "./ThemeSelector";
import { Theme, defaultThemes } from "@/config/themes";
import { Settings, ArrowUpDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialSeconds: number;
}

export function CountdownTimer({ initialSeconds }: CountdownTimerProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
  const [showControls, setShowControls] = useState(false);
  const [fontSize, setFontSize] = useState(144);
  const isDragging = useRef(false);
  const lastY = useRef(0);
  const [showFirstVisitAlert, setShowFirstVisitAlert] = useState(false);

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
    let interval: NodeJS.Timeout;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowAlert(true);
            playAlertSound();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const playAlertSound = () => {
    const audio = new Audio("/timeEnd.mp3");
    audio.play().catch(e => console.log("播放提示音失败:", e));
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const deltaY = lastY.current - e.clientY;
    const newSize = Math.max(40, Math.min(400, fontSize + deltaY));
    setFontSize(newSize);
    localStorage.setItem("timerFontSize", String(newSize));
    lastY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("timerFontSize");
    if (savedFontSize) {
      setFontSize(Number(savedFontSize));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowFirstVisitAlert(true);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative" style={{ backgroundColor: currentTheme.background }}>
      <div className="text-center relative">
        {showFirstVisitAlert && (
          <Alert
            className={cn(
              "absolute -top-20 left-1/2 transform -translate-x-1/2 w-auto",
              "bg-white dark:bg-zinc-950",
              "text-zinc-950 dark:text-zinc-50",
              "border border-zinc-200 dark:border-zinc-800",
              "shadow-md",
              "flex justify-center items-center"
            )}
          >
            <AlertDescription className="flex items-center justify-center mx-2">
              <ArrowUpDown className="h-4 w-4" />
              <span className="mx-2">试试上下拖动时间来调整大小</span>
              <Button variant="ghost" size="sm" className="ml-2 h-4 hover:bg-transparent" onClick={() => setShowFirstVisitAlert(false)}>
                <X className="w-4 h-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div
              className="font-mono mb-8 cursor-ns-resize select-none"
              style={{
                color: currentTheme.text,
                fontSize: `${fontSize}px`
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
            >
              {formatTime(seconds)}
            </div>
          </HoverCardTrigger>
          {!showFirstVisitAlert && (
            <HoverCardContent
              side="top"
              align="center"
              className={cn(
                "w-auto",
                "bg-white dark:bg-zinc-950",
                "text-zinc-950 dark:text-zinc-50",
                "rounded-xl border border-zinc-200 dark:border-zinc-800",
                "data-[state=open]:animate-in",
                "data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0",
                "data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95",
                "data-[state=open]:zoom-in-95",
                "data-[side=top]:slide-in-from-bottom-2",
                "shadow-md"
              )}
              sideOffset={8}
            >
              <div className="relative px-4 py-3">
                <div className="absolute w-1.5 h-1.5 rounded-full left-1.5 top-1/2 -translate-y-1/2 bg-zinc-950 dark:bg-zinc-50" />
                <div className="flex items-center gap-3 pl-3">
                  <ArrowUpDown className="h-4 w-4 opacity-80" />
                  <span className="text-sm font-medium whitespace-nowrap">上下拖动调整字体大小</span>
                </div>
              </div>
            </HoverCardContent>
          )}
        </HoverCard>
        {!isRunning && (
          <Button
            size="lg"
            style={{
              backgroundColor: currentTheme.buttonPrimary,
              fontSize: "1.5rem",
              padding: "1.5rem 3rem"
            }}
            className="hover:opacity-90 transition-opacity"
            onClick={() => setIsRunning(true)}
          >
            开始
          </Button>
        )}
      </div>

      <div className="fixed top-4 right-4 z-50" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
        <div
          className={`absolute right-0 flex gap-2 items-center transition-all duration-300 ${
            showControls ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          {isRunning && (
            <Button
              size="sm"
              style={{
                backgroundColor: currentTheme.buttonPrimary
              }}
              className="hover:opacity-90 transition-opacity"
              onClick={() => setIsRunning(false)}
            >
              暂停
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
            重置
          </Button>
          <Button
            size="sm"
            style={{
              backgroundColor: currentTheme.buttonSecondary
            }}
            className="hover:opacity-90 transition-opacity"
            onClick={() => router.push("/")}
          >
            返回
          </Button>
          <Button
            size="sm"
            style={{
              backgroundColor: currentTheme.buttonSecondary
            }}
            className="hover:opacity-90 transition-opacity"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? "退出全屏" : "全屏"}
          </Button>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
        </div>
        <Settings
          className={`w-6 h-6 cursor-pointer transition-opacity duration-300 ${showControls ? "opacity-0" : "opacity-100"}`}
          style={{ color: currentTheme.text }}
        />
      </div>

      {showAlert && (
        <div
          className="fixed top-4 right-4 p-4 rounded-md"
          style={{
            backgroundColor: currentTheme.buttonPrimary,
            color: "white"
          }}
        >
          时间到！
        </div>
      )}
    </div>
  );
}
