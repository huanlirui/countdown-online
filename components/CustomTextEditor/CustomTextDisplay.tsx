/*
 * @Description:
 */
import { useRef } from "react";
import { Theme } from "@/config/themes";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowUpDown, Edit2 } from "lucide-react";

interface CustomTextDisplayProps {
  text: string;
  fontSize: number;
  theme: Theme;
  onFontSizeChange: (size: number) => void;
  onDoubleClick: (e: React.MouseEvent) => void;
}

export function CustomTextDisplay({ text, fontSize, theme, onFontSizeChange, onDoubleClick }: CustomTextDisplayProps) {
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaY = lastY.current - e.clientY;
    const newSize = Math.max(20, Math.min(200, fontSize + deltaY));
    onFontSizeChange(newSize);
    lastY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "select-none mb-4",
            "cursor-ns-resize",
            "transition-colors duration-200",
            "hover:opacity-90",
            "relative",
            "mx-8",
            "max-w-[90vw]",
            "break-words",
            "whitespace-pre-wrap"
          )}
          style={{
            color: theme.text,
            fontSize: `${fontSize}px`,
            wordBreak: "break-word"
          }}
          onDoubleClick={onDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {text}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
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
          "data-[side=top]:slide-in-from-bottom-2",
          "shadow-md",
          "relative",
          "after:absolute after:w-2 after:h-2 after:rotate-45",
          "after:bottom-[-5px]",
          "after:left-[50%] after:translate-x-[-50%]",
          "after:border-b after:border-r",
          "after:border-zinc-200 dark:after:border-zinc-800",
          "after:bg-white dark:after:bg-zinc-950",
          "after:shadow-sm"
        )}
        sideOffset={8}
      >
        <div className="relative">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-3 w-3 opacity-80" />
              <span className="text-xs font-medium">上下拖动调整文字大小</span>
            </div>
            <div className="flex items-center gap-2">
              <Edit2 className="h-3 w-3 opacity-80" />
              <span className="text-xs font-medium">双击编辑文字内容</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
