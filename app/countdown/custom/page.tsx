/*
 * @Description: 
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function CustomCountdown() {
  const router = useRouter();
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleStart = () => {
    const totalSeconds =
      parseInt(hours || '0') * 3600 +
      parseInt(minutes || '0') * 60 +
      parseInt(seconds || '0');
    
    if (totalSeconds > 0) {
      router.push(`/countdown/${totalSeconds}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">自定义倒计时</h1>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">小时</label>
              <Input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">分钟</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">秒</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          <Button className="w-full" size="lg" onClick={handleStart}>
            开始倒计时
          </Button>
        </div>
      </Card>
    </div>
  );
} 