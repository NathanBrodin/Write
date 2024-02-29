"use client";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { useEffect, useState } from "react";

export default function Preview({ content }: { content?: string }) {
  const [markdown, setMarkdown] = useState("");

  async function convertMarkdownToHtml(content: string): Promise<string> {
    const file = await unified()
      .use(remarkParse) // Convert into markdown AST
      .use(remarkRehype) // Transform to HTML AST
      .use(rehypeStringify) // Convert AST into serialized HTML
      .process(content);

    return String(file);
  }

  useEffect(() => {
    const ct = convertMarkdownToHtml(content || "");
    ct.then((c) => setMarkdown(c));

    return () => {
      setMarkdown("");
    };
  }, [content]);

  return (
    <div
      className="prose dark:prose-invert mx-auto md:max-w-3xl lg:max-w-4xl"
      dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
    />
  );
}
