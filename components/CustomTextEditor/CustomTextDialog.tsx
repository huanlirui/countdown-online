/*
 * @Description: 
 */
import { ReactNode } from "react";
import { Theme } from "@/config/themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TextHistoryList } from "./TextHistoryList";
import { NewTextInput } from "./NewTextInput";
import { PresetTextList } from "./PresetTextList";

interface CustomTextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: Theme;
  onSelect: (text: string) => void;
  trigger: ReactNode;
}

export function CustomTextDialog({ open, onOpenChange, theme, onSelect, trigger }: CustomTextDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[600px] gap-0">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-semibold">编辑文案</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 h-[400px] w-full">
          {/* 左侧：预设文案 */}
          <div className="w-[40%] flex flex-col">
            <h3 className="text-sm font-medium mb-2">预设文案</h3>
            <div className="border rounded-lg p-3 flex-1 overflow-x-hidden">
              <PresetTextList theme={theme} onSelect={onSelect} />
            </div>
          </div>

          {/* 右侧：历史记录 */}
          <div className="w-[60%] flex flex-col">
            <h3 className="text-sm font-medium mb-2">历史记录</h3>
            <div className="border rounded-lg p-3 flex-1 overflow-y-auto">
              <TextHistoryList theme={theme} onSelect={onSelect} />
            </div>
          </div>
        </div>

        {/* 底部：新建文案 */}
        <div className="pt-4 mt-4 border-t border-border">
          <NewTextInput theme={theme} onSubmit={onSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 