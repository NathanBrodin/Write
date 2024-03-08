"use client";

import Spinner from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import useStoreUserEffect from "@/hooks/use-store-user-effect";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Store user in the store
  useStoreUserEffect();

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center dark:bg-[#1F1F1F]">
        <Spinner size="lg" />
        <p className="font-medium">Checking authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="flex h-full dark:bg-[#1F1F1F] print:hidden">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
