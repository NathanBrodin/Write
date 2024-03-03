"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function UploadImageModal() {
  const update = useMutation(api.projects.update);
  const uploadImage = useUploadImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    uploadImage.onClose();
  };

  async function onChange(file?: File) {
    if (file && uploadImage.projectId) {
      const promise = edgestore.publicFiles
        .upload({
          file,
          options: {
            replaceTargetUrl: uploadImage.url,
          },
        })
        .then((res) => {
          const updatePromise = update({
            id: uploadImage.projectId!,
            image: res.url,
          });

          toast.promise(updatePromise, {
            loading: "Updating project...",
            success: "Project updated",
            error: "Failed to update project",
          });
        });

      toast.promise(promise, {
        loading: "Uploading image...",
        success: "Image uploaded",
        error: "Failed to upload image",
      });
    }
    onClose();
  }

  return (
    <Dialog open={uploadImage.isOpen} onOpenChange={uploadImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Upload an image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
}
