"use client";

import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Copy, FileImage, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ImageItemProps {
  id?: Id<"images">;
  url?: string;
  label: string;
}

export default function ImageItem({ id, url, label }: ImageItemProps) {
  const archive = useMutation(api.images.archive);
  const { user } = useUser();

  function onArchive(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive document.",
    });
  }

  function onCopy(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!url) return;

    navigator.clipboard.writeText(url);
    toast("Image URL copied to clipboard!");
  }

  return (
    <div
      style={{ paddingLeft: "30px" }}
      className={cn(
        "hover:bg-primary/5 text-muted-foreground group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium",
      )}
    >
      <FileImage className="text-muted-foreground mr-2 h-[18px] w-[18px] shrink-0" />

      <span className="truncate">{label}</span>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="text-muted-foreground h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Image URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-muted-foreground p-2 text-xs">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

ImageItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
