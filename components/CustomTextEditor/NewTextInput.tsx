/*
 * @Description:
 */
import { useState, useCallback } from "react";
import { Theme } from "@/config/themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface NewTextInputProps {
  theme: Theme;
  onSubmit: (text: string) => void;
}

export function NewTextInput({ theme, onSubmit }: NewTextInputProps) {
  const [newText, setNewText] = useState("");
  const t = useTranslations("CustomText");

  const handleSubmit = useCallback(() => {
    const trimmedText = newText.trim();
    if (trimmedText) {
      onSubmit(trimmedText);
      setNewText("");
    }
  }, [newText, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="p-4 border-t border-border">
      <div className="flex gap-2">
        <Input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("newTextPlaceholder")}
          className={cn("flex-1", "focus-visible:ring-1", "focus-visible:ring-offset-0")}
        />
        <Button
          onClick={handleSubmit}
          disabled={!newText.trim()}
          style={{
            backgroundColor: theme.buttonPrimary
          }}
        >
          {t("addButton")}
        </Button>
      </div>
    </div>
  );
}
