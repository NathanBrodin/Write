"use client";

import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "bg-background fixed top-0 z-50 flex w-full items-center px-6 py-3 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {isLoading && (
          <Button disabled size="sm">
            Get Note
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" redirectUrl="/projects">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignInButton mode="modal" redirectUrl="/projects">
              <Button size="sm">Get Write</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">Enter Write</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
