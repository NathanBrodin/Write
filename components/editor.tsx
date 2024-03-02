"use client";

import { useTheme } from "next-themes";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as MD, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { EditorView } from "@codemirror/view";
import FormattingToolbar from "./formatting-toolbar";
import { useRef } from "react";

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
  const editorViewRef = useRef<EditorView | null>(null);

  function getCursorPosition() {
    if (editorViewRef.current) {
      const cursorPos = editorViewRef.current.state.selection.main.head;
      const line = editorViewRef.current.state.doc.lineAt(cursorPos);
      const ch = cursorPos - line.from;

      return { line: line.number - 1, ch };
    }
  }

  function handleInsertText(syntax: string) {
    const cursor = getCursorPosition();
    if (cursor) {
      const { line, ch } = cursor;

      const lines = content.split("\n");
      lines[line] = lines[line].slice(0, ch) + syntax + lines[line].slice(ch);
      const newContent = lines.join("\n");
      setContent(newContent);
    }
  }

  return (
    <div className="mx-auto flex h-full min-h-screen w-full max-w-3xl flex-col px-4 text-base md:max-w-3xl lg:max-w-4xl">
      <FormattingToolbar insertText={handleInsertText} />
      <CodeMirror
        value={content}
        onChange={setContent}
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
        onCreateEditor={(editor) => {
          editorViewRef.current = editor;
        }}
      />
    </div>
  );
}
