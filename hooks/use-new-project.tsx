import { create } from "zustand";

type NewProjectStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProject = create<NewProjectStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
