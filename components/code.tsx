import { useTheme } from "next-themes";
import { Prism } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

export function CodeBlock({ ...props }) {
  const { resolvedTheme } = useTheme();

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
  return <div className="not-prose">{props.children}</div>;
}
