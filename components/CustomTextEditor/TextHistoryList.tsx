/*
 * @Description:
 */
import { Theme } from "@/config/themes";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useTextHistory } from "../../hooks/useTextHistory";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TextHistoryListProps {
  theme: Theme;
  onSelect: (text: string) => void;
}

export function TextHistoryList({ onSelect }: TextHistoryListProps) {
  const { history } = useTextHistory();
  const safeHistory = Array.isArray(history) ? history.slice(-20) : [];

  return (
    <Command
      className={cn("rounded-none", "border-none", "shadow-none", "w-full")}
      style={{
        backgroundColor: "transparent"
      }}
    >
      <CommandInput placeholder="搜索历史记录..." className={cn("border-none", "focus:ring-0", "placeholder:text-gray-400")} />
      <CommandList className="max-h-[300px]">
        {safeHistory.length === 0 ? (
          <CommandEmpty>暂无历史记录</CommandEmpty>
        ) : (
          <CommandGroup heading="最近使用">
            {safeHistory.map((text, index) => (
              <CommandItem
                key={index}
                onSelect={() => onSelect(text)}
                className={cn("flex items-center gap-2", "cursor-pointer", "hover:bg-black/5", "dark:hover:bg-white/5", "py-2 px-4")}
                style={{
                  overflow: "hidden",
                  wordBreak: "break-all",
                  overflowWrap: "break-word"
                }}
              >
                <Clock className="h-4 w-4 opacity-50 flex-shrink-0" />
                <span className="break-all">{text}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
