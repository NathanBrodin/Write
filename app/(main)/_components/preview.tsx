"use client";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { useEffect, useState } from "react";

export default function Preview({
  initialContent,
}: {
  initialContent?: string;
}) {
  const [content, setContent] = useState("");

  async function convertMarkdownToHtml(content: string): Promise<string> {
    const file = await unified()
      .use(remarkParse) // Convert into markdown AST
      .use(remarkRehype) // Transform to HTML AST
      .use(rehypeStringify) // Convert AST into serialized HTML
      .process(content);

    return String(file);
  }

  useEffect(() => {
    const ct = convertMarkdownToHtml(initialContent || "");
    ct.then((c) => setContent(c));

    return () => {
      setContent("");
    };
  }, [initialContent]);

  return (
    <div
      className="md:max-w-3xl lg:max-w-4xl mx-auto prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
