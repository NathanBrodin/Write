"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const { edgestore } = useEdgeStore();

  const projects = useQuery(api.projects.getTrash);
  const restoreProject = useMutation(api.projects.restore);
  const removeProject = useMutation(api.projects.remove);

  const documents = useQuery(api.documents.getTrash);
  const restoreDocument = useMutation(api.documents.restore);
  const removeDocument = useMutation(api.documents.remove);

  const images = useQuery(api.images.getTrash);
  const restoreImage = useMutation(api.images.restore);
  const removeImage = useMutation(api.images.remove);

  const [search, setSearch] = useState("");

  const filteredProjects = projects?.filter((project) => {
    return project.title.toLocaleLowerCase().includes(search.toLowerCase());
  });

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLocaleLowerCase().includes(search.toLowerCase());
  });

  const filteredImages = images?.filter((image) => {
    return image.title.toLocaleLowerCase().includes(search.toLowerCase());
  });

  function onDocumentClick(
    documentId: Id<"documents">,
    projectId?: Id<"projects">,
  ) {
    if (!projectId) return;

    router.push(`/projects/${projectId}/${documentId}`);
  }

  function onProjectClick(projectId: Id<"projects">) {
    router.push(`/projects/${projectId}`);
  }

  function onDocumentRestore(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) {
    event.stopPropagation();
    const promise = restoreDocument({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored!",
      error: "Failed to restore document.",
    });
  }

  function onProjectRestore(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    projectId: Id<"projects">,
  ) {
    event.stopPropagation();
    const promise = restoreProject({ id: projectId });

    toast.promise(promise, {
      loading: "Restoring project...",
      success: "Project restored!",
      error: "Failed to restore project.",
    });
  }

  function onImageRestore(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    imageId: Id<"images">,
  ) {
    event.stopPropagation();
    const promise = restoreImage({ id: imageId });

    toast.promise(promise, {
      loading: "Restoring image...",
      success: "Image restored!",
      error: "Failed to restore image.",
    });
  }

  function onDocumentRemove(
    documentId: Id<"documents">,
    parentProjectId?: Id<"projects">,
  ) {
    const promise = removeDocument({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted!",
      error: "Failed to delete document.",
    });

    if (params.documentId == documentId) {
      if (parentProjectId) {
        router.push(`/projects/${parentProjectId}`);
      } else {
        router.push(`/projects`);
      }
    }
  }

  function onProjectRemove(projectId: Id<"projects">) {
    const promise = removeProject({ id: projectId });

    toast.promise(promise, {
      loading: "Deleting project...",
      success: "Project deleted!",
      error: "Failed to delete project.",
    });

    router.push(`/projects`);
  }

  async function onImageRemove(imageId: Id<"images">, imageUrl: string) {
    const promise = removeImage({ id: imageId });
    const storePromise = edgestore.publicFiles.delete({
      url: imageUrl,
    });

    const allPromises = Promise.all([promise, storePromise]);

    toast.promise(allPromises, {
      loading: "Deleting image...",
      success: "Image deleted!",
      error: "Failed to delete image.",
    });
  }

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          className="bg-secondary h-7 px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        {filteredDocuments?.length === 0 &&
          filteredProjects?.length === 0 &&
          filteredImages?.length === 0 && (
            <p className="text-muted-foreground pb-2 text-center text-sm">
              Trashbox is empty
            </p>
          )}
        {filteredProjects?.map((project) => (
          <div
            key={project._id}
            role="button"
            onClick={() => onProjectClick(project._id)}
            className="hover:bg-primary/5 text-primary flex w-full items-center justify-between rounded-sm text-sm"
          >
            <span className="truncate pl-2">{project.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onProjectRestore(e, project._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="text-muted-foreground h-4 w-4" />
              </div>
              <ConfirmModal onConfirm={() => onProjectRemove(project._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="text-muted-foreground h-4 w-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
        {filteredDocuments?.length !== 0 && <Separator className="mt-2" />}
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onDocumentClick(document._id, document.projectId)}
            className="hover:bg-primary/5 text-primary flex w-full items-center justify-between rounded-sm text-sm"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onDocumentRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="text-muted-foreground h-4 w-4" />
              </div>
              <ConfirmModal
                onConfirm={() =>
                  onDocumentRemove(document._id, document.projectId)
                }
              >
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="text-muted-foreground h-4 w-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
        {filteredImages?.length !== 0 && <Separator className="mt-2" />}
        {filteredImages?.map((image) => (
          <div
            key={image._id}
            className="hover:bg-primary/5 text-primary flex w-full items-center justify-between rounded-sm text-sm"
          >
            <span className="truncate pl-2">{image.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onImageRestore(e, image._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="text-muted-foreground h-4 w-4" />
              </div>
              <ConfirmModal
                onConfirm={() => onImageRemove(image._id, image.url)}
              >
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="text-muted-foreground h-4 w-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
