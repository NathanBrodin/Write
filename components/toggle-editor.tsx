import { useEffect, useState } from "react";
import Editor from "./editor";
import Preview from "./preview";
import { useDebounceValue } from "usehooks-ts";

interface ToggleEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export default function ToggleEditor({
  initialContent,
  onChange,
}: ToggleEditorProps) {
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
    <div className="flex h-full min-h-screen w-full justify-center pt-14">
      <Editor content={content} setContent={handleContentChange} />
      {/* <Preview content={content} /> */}
    </div>
  );
}
