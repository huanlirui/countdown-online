/*
 * @Description: 
 */
import { ReactNode } from "react";
import { Theme } from "@/config/themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TextHistoryList } from "./TextHistoryList";
import { NewTextInput } from "./NewTextInput";
import { PresetTextList } from "./PresetTextList";
import { useTranslations } from "next-intl";

interface CustomTextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: Theme;
  onSelect: (text: string) => void;
  trigger: ReactNode;
}

export function CustomTextDialog({ open, onOpenChange, theme, onSelect, trigger }: CustomTextDialogProps) {
  const t = useTranslations("CustomText");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[900px] min-w-[320px] gap-0">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-semibold">{t("editTitle")}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4 h-[400px] w-full">
          {/* 左侧：预设文案 */}
          <div className="w-full md:w-[40%] flex flex-col">
            <h3 className="text-sm font-medium mb-2">{t("presetTitle")}</h3>
            <div className="border rounded-lg p-3 flex-1 overflow-x-hidden">
              <PresetTextList theme={theme} onSelect={onSelect} />
            </div>
          </div>

          {/* 右侧：历史记录 */}
          <div className="w-full md:w-[60%] flex flex-col">
            <h3 className="text-sm font-medium mb-2">{t("historyTitle")}</h3>
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