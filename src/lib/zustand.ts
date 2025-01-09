import { PlatformLink } from "@/types/links.types";
import { create } from "zustand";

interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_picture_url?: string;
}

interface PreviewState {
  user: User;
  links: PlatformLink[];
  updateUser: (user: User) => void;
  updateLinks: (links: PlatformLink[]) => void;
  reset: () => void;
}

const initialState = {
  user: {},
  links: [],
};

export const usePreviewStore = create<PreviewState>((set) => ({
  ...initialState,
  updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  updateLinks: (links) => set({ links }),
  reset: () => set(initialState),
}));
