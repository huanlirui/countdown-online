/*
 * @Description:
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function CustomCountdown() {
  const router = useRouter();
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
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
      router.push(`/countdown/${totalSeconds}`);
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
            <h1 className="text-3xl font-bold">自定义倒计时</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleReset}
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            重置
          </Button>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">预设时间</h2>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handlePreset(0, 1, 0)}>
                1分钟
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 3, 0)}>
                3分钟
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 5, 0)}>
                5分钟
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handlePreset(0, 10, 0)}>
                10分钟
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 15, 0)}>
                15分钟
              </Button>
              <Button variant="outline" onClick={() => handlePreset(0, 30, 0)}>
                30分钟
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handlePreset(1, 0, 0)}>
                1小时
              </Button>
              <Button variant="outline" onClick={() => handlePreset(2, 0, 0)}>
                2小时
              </Button>
              <Button variant="outline" onClick={() => handlePreset(4, 0, 0)}>
                4小时
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">快捷调整</h2>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="secondary" onClick={() => handleAddTime(0, 5, 0)}>
                增加5分钟
              </Button>
              <Button variant="secondary" onClick={() => handleAddTime(0, 15, 0)}>
                增加15分钟
              </Button>
              <Button variant="secondary" onClick={() => handleAddTime(0, 30, 0)}>
                增加30分钟
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">小时</label>
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
              <label className="block text-sm font-medium mb-2">分钟</label>
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
              <label className="block text-sm font-medium mb-2">秒</label>
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
            开始倒计时
          </Button>
        </div>
      </Card>
    </div>
  );
}
