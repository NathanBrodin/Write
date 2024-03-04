"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function Banner({ documentId }: { documentId: Id<"documents"> }) {
  const router = useRouter();
  const params = useParams();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  function onRemove() {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted!",
      error: "Failed to delete document.",
    });

    router.push(`/projects/${params.projectId}`);
  }

  function onRestore() {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored!",
      error: "Failed to restore document.",
    });
  }

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="hover:bg-primary/5 h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:text-white"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary/5 h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:text-white"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}
