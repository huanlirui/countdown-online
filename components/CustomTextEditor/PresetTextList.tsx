/*
 * @Description:
 */
import { Theme } from "@/config/themes";

const DEFAULT_COUNTDOWN_TEXTS = [
  "距离开始还有",
  "距离结束还有",
  "活动开始倒计时",
  "活动结束倒计时",
  "限时特惠倒计时",
  "秒杀开始倒计时",
  "抢购结束倒计时",
  "报名截止倒计时",
  // 其他场景
  "直播开始倒计时",
  "考试倒计时",
  "发布倒计时",
  "预售开始倒计时"
];

interface PresetTextListProps {
  theme: Theme;
  onSelect: (text: string) => void;
}

export function PresetTextList({ onSelect }: PresetTextListProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {DEFAULT_COUNTDOWN_TEXTS.map(text => (
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
