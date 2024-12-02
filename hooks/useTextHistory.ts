/*
 * @Description:
 */
import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "text-history";

// 添加类型定义
interface UseTextHistoryOptions {
  maxItems?: number;
}

export function useTextHistory(options: UseTextHistoryOptions = {}) {
  const maxItems = options.maxItems ?? 30;

  // 从 localStorage 初始化历史记录
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 直接保存到 localStorage，移除防抖
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  }, [history]);

  const addToHistory = useCallback(
    (text: string) => {
      if (!text?.trim()) return;

      setHistory(prev => {
        const filtered = prev.filter(item => item !== text);
        const newHistory = [text, ...filtered].slice(0, maxItems);
        return newHistory;
      });
    },
    [maxItems]
  );

  // 添加清除历史记录的方法
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory
  };
}
