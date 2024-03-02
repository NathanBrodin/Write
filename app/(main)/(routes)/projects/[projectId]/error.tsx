"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // TODO: Implement Sentry here
    console.error(error);
  }, [error]);

  function handleClick() {
    reset();
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:block hidden"
      />
      <h2 className="text-xl font-medium">Something went wrong</h2>
      <Button onClick={handleClick}>Try again</Button>
    </div>
  );
}
