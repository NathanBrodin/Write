"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export function CoverImageModal() {
  const coverImage = useCoverImage();

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
            <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>
            TODO: Upload cover image
        </div>
      </DialogContent>
    </Dialog>
  );
}