"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CopyButtonProps {
  content: string;
  className?: string;
}

export function CopyButton({ content, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  function handleOnClick() {
    navigator.clipboard.writeText(content);
    setHasCopied(true);
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(className)}
      onClick={handleOnClick}
    >
      {hasCopied ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
