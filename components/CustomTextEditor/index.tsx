/*
 * @Description:
 */
import { useState, useCallback } from "react";
import { CustomTextDisplay } from "./CustomTextDisplay";
import { CustomTextDialog } from "./CustomTextDialog";
import { Theme } from "@/config/themes";
import { useTextHistory } from "@/hooks/useTextHistory";

interface CustomTextEditorProps {
  text: string;
  fontSize: number;
  theme: Theme;
  onTextChange: (text: string) => void;
  onFontSizeChange: (size: number) => void;
}

export function CustomTextEditor({ text, fontSize, theme, onTextChange, onFontSizeChange }: CustomTextEditorProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { addToHistory } = useTextHistory();

  const handleTextUpdate = useCallback(
    (newText: string) => {
      if (newText && newText.trim()) {
        onTextChange(newText);
        addToHistory(newText);
        setIsPopoverOpen(false);
      }
    },
    [onTextChange, addToHistory]
  );

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopoverOpen(prev => !prev);
    console.log("Double click triggered");
  }, []);

  return (
    <div className="relative isolate">
      <CustomTextDialog
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        theme={theme}
        onSelect={handleTextUpdate}
        trigger={
          <CustomTextDisplay
            text={text}
            fontSize={fontSize}
            theme={theme}
            onFontSizeChange={onFontSizeChange}
            onDoubleClick={handleDoubleClick}
          />
        }
      />
    </div>
  );
}
