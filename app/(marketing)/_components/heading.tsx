"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3-xl sm:text-5xl md:text-6xl font-bold">
        Capture, Collaborate, Create. Welcome to{" "}
        <span className="underline">Note</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Note is your all-in-one platform for <br />
        seamless collaboration and creativity.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Button disabled>
            Enter Note
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Note
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal" redirectUrl="/projects">
          <Button>
            Enter Note
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
