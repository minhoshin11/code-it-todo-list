import { create } from "zustand";

export interface imageState {
  imageUrl: string | null;
  setImageUrl: (imageUrl: string | null) => void;
}
export const useImageStore = create<imageState>((set) => ({
  imageUrl: null,
  setImageUrl: (imageUrl: string | null) => set(() => ({ imageUrl: imageUrl })),
}));
