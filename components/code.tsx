import { useTheme } from "next-themes";
import { Prism } from "react-syntax-highlighter";
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyButton } from "@/components/copy-button";

export function CodeBlock({ ...props }) {
  const { resolvedTheme } = useTheme();

  // Inline code
  if (!props.className?.includes("language" || "language")) {
    return (
      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {props.children}
      </code>
    );
  }

  return (
    <Prism
      language={props.className?.replace(/(?:lang(?:uage)?-)/, "")}
      style={resolvedTheme === "dark" ? oneDark : oneLight}
      wrapLines={true}
      showLineNumbers={false}
      className="not-prose rounded-md"
    >
      {props.children}
    </Prism>
  );
}

export function Pre({ ...props }) {
  const codeString = props.children.props.children;

  return (
    <div className="not-prose group relative">
      <CopyButton
        content={codeString}
        className="absolute right-1 top-1 opacity-0 group-hover:opacity-100"
      />
      {props.children}
    </div>
  );
}
