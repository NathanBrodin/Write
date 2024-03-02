import { useEffect, useState } from "react";
import { Mode } from "@/lib/types";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import Editor from "@/components/editor";
import Preview from "@/components/preview";

interface ToggleEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export default function ToggleEditor({
  initialContent,
  onChange,
}: ToggleEditorProps) {
  const [mode, setMode] = useLocalStorage<Mode[]>("mode", ["code"]);
  const [content, setContent] = useState<string>(initialContent || "");
  const [debouncedContent, setDebouncedContent] = useDebounceValue(
    content,
    1000,
  );

  useEffect(() => {
    onChange?.(debouncedContent);
  }, [debouncedContent, onChange]);

  function handleContentChange(content: string) {
    setContent(content);
    setDebouncedContent(content);
  }

  return (
    <div
      className={cn(
        "h-full min-h-screen w-full py-24",
        mode.length <= 1 && "flex justify-center",
        mode.length > 1 && "grid grid-cols-2 gap-4 px-2",
      )}
    >
      {mode.includes("code") && (
        <Editor content={content} setContent={handleContentChange} />
      )}
      {mode.includes("preview") && <Preview content={content} />}
    </div>
  );
}
