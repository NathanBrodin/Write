"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as MD, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { EditorView } from "@codemirror/view";

const styleTheme = EditorView.baseTheme({
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
});

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false },
);

export default function Editor({ onChange, initialContent }: EditorProps) {
  const { resolvedTheme } = useTheme();

  // I am using a useState between the Editor and Convex because it was too slow to update the Convex state on every key stroke
  const [markdown, setMarkdown] = useState<string>(initialContent || "");
  const [debouncedMarkdown, setDebouncedMarkdown] = useDebounceValue(
    markdown,
    500,
  );

  useEffect(() => {
    onChange(debouncedMarkdown);
  }, [debouncedMarkdown, onChange]);

  function handleChange(value: string) {
    setMarkdown(value);
    setDebouncedMarkdown(value);
  }

  return (
    <CodeMirror
      value={markdown}
      onChange={handleChange}
      className="h-full min-h-screen w-full max-w-3xl text-base focus:outline-none"
      extensions={[
        styleTheme,
        MD({ base: markdownLanguage, codeLanguages: languages }),
      ]}
      theme={resolvedTheme === "dark" ? githubDark : githubLight}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
    />
  );
}
