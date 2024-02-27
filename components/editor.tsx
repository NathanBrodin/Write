"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Editor({ onChange, initialContent }: EditorProps) {
  const { resolvedTheme } = useTheme();

  // I am using a useState between the Editor and Convex because it was too slow to update the Convex state on every key stroke
  const [markdown, setMarkdown] = useState<string>(initialContent || "");
  const [debouncedMarkdown, setDebouncedMarkdown] = useDebounceValue(
    markdown,
    500
  );

  useEffect(() => {
    onChange(debouncedMarkdown);
  }, [debouncedMarkdown, onChange]);

  function handleChange(value: string) {
    setMarkdown(value);
    setDebouncedMarkdown(value);
  }

  return (
    <MarkdownEditor
      className="w-full"
      height="calc(100vh - 300px)"
      value={markdown}
      onChange={handleChange}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
