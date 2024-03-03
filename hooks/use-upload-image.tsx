import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type UploadImageStore = {
  url?: string;
  projectId?: Id<"projects">;
  isOpen: boolean;
  onOpen: (projectId: Id<"projects">) => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useUploadImage = create<UploadImageStore>((set) => ({
  url: undefined,
  projectId: undefined,
  isOpen: false,
  onOpen: (projectId: Id<"projects">) =>
    set({ isOpen: true, url: undefined, projectId: projectId }),
  onClose: () => set({ isOpen: false, url: undefined, projectId: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url, projectId: undefined }),
}));
