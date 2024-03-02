"use client";

import { useTheme } from "next-themes";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as MD, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { EditorView } from "@codemirror/view";

const styleTheme = EditorView.baseTheme({
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
  "&.cm-editor": {
    backgroundColor: "transparent",
  },
});

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function Editor({ content, setContent }: EditorProps) {
  const { resolvedTheme } = useTheme();

  return (
    <CodeMirror
      value={content}
      onChange={setContent}
      className="mx-auto flex h-full min-h-screen w-full max-w-3xl px-4 text-base md:max-w-3xl lg:max-w-4xl"
      extensions={[
        styleTheme,
        MD({ base: markdownLanguage, codeLanguages: languages }),
        EditorView.lineWrapping,
      ]}
      theme={resolvedTheme === "dark" ? githubDark : githubLight}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
    />
  );
}
