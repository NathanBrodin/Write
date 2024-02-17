"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Menu({ documentId }: { documentId: Id<"documents"> }) {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  function onArchive() {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });

    router.push("/documents");
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
            <DropdownMenuItem onClick={onArchive}>
                <Trash className="w-4 h-4 mr-2"/>
                Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="w-10 h-10" />
    )
}