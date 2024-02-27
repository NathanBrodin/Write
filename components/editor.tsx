"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

interface EditorProps {
  onChange: (value: string, markdown: string) => void;
  initialContent?: string;
}

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Editor({ onChange, initialContent }: EditorProps) {
  const [markdown, setMarkdown] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  return (
    <MarkdownEditor
      className="w-full"
      height="calc(100vh - 300px)"
      value={markdown}
      onChange={(value, viewUpdate) => setMarkdown(value)}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
