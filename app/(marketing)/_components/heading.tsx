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
      <h1 className="text-3-xl font-bold sm:text-5xl md:text-6xl">
        Capture, Collaborate, Create. Welcome to{" "}
        <span className="underline">Write</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Write is your all-in-one platform for <br />
        seamless collaboration and creativity.
      </h3>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Button disabled>
            Enter Write
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/projects">
            Enter Write
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal" redirectUrl="/projects">
          <Button>
            Enter Write
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
