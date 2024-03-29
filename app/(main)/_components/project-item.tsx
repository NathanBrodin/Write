"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  FolderIcon,
  ImagePlus,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { ProjectTitle } from "./project-title";
import { useUploadImage } from "@/hooks/use-upload-image";

interface ItemProps {
  projectId: Id<"projects">;
  projectTitle: string;
  active?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
}

export default function ProjectItem({
  projectId,
  projectTitle,
  active,
  expanded,
  onExpand,
  label,
  onClick,
}: ItemProps) {
  const { user } = useUser();
  const router = useRouter();

  const create = useMutation(api.documents.create);
  const archive = useMutation(api.projects.archive);
  const uploadImage = useUploadImage();

  function handleExpand(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    onExpand?.();
  }

  function onCreateDocument(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.stopPropagation();
    if (!projectId) return;

    const promise = create({
      title: "Untitled",
      projectId: projectId,
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
      }

      router.push(`/projects/${projectId}/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New document created!",
      error: "Failed to create a new document.",
    });
  }

  async function onCreateImage(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.stopPropagation();
    if (!projectId) return;

    uploadImage.onOpen(projectId);
  }

  function onArchive(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!projectId) return;

    const promise = archive({ id: projectId }).then(() => {
      router.push("/projects");
    });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive project.",
    });
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className={cn(
        "hover:bg-primary/5 text-muted-foreground group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium",
        active && "bg-primary/5 text-primary",
      )}
    >
      <div
        role="button"
        className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
        onClick={handleExpand}
      >
        <ChevronIcon className="text-muted-foreground/50 h-4 w-4 shrink-0" />
      </div>
      <FolderIcon className="text-muted-foreground mr-2 h-[18px] w-[18px] shrink-0" />
      <span className="truncate">{label}</span>
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
            <DropdownMenuLabel>
              {projectId && (
                <ProjectTitle
                  initialTitle={projectTitle}
                  projectId={projectId}
                />
              )}
            </DropdownMenuLabel>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <div className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600">
              <Plus className="text-muted-foreground h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onCreateDocument}>
              <FileText className="mr-2 h-4 w-4" />
              Add a new document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCreateImage}>
              <ImagePlus className="mr-2 h-4 w-4" />
              Add a new image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

ProjectItem.Skeleton = function ItemSkeleton() {
  return (
    <div className="flex gap-x-2 py-[3px]">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
