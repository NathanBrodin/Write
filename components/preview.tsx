"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import { CodeBlock, Pre } from "@/components/code";

export default function Preview({ content }: { content?: string }) {
  const options = { code: CodeBlock, pre: Pre };

  return (
    <Markdown
      className="prose prose-sm sm:prose-base dark:prose-invert mx-auto px-4 md:max-w-3xl lg:max-w-4xl"
      components={options}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSanitize,
        [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
      ]}
    >
      {content}
    </Markdown>
  );
}
