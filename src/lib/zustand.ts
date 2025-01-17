import { Links } from "@/__generated__/graphql";
import { create } from "zustand";
import { Users } from "@/__generated__/graphql";

export type LinkType = Omit<
  Links,
  "user" | "created_at" | "updated_at" | "user_id"
>;

export type UserType = Omit<
  Users,
  "auth0_id" | "created_at" | "links" | "updated_at"
>;

interface PreviewState {
  user: UserType;
  links: LinkType[];
  updateUser: (user: UserType) => void;
  updateLinks: (links: Partial<LinkType>[]) => void;
  reset: () => void;
}

const initialState = {
  user: {} as UserType,
  links: [],
};

export const usePreviewStore = create<PreviewState>((set) => ({
  ...initialState,
  updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  //@ts-expect-error - This is a partial update
  updateLinks: (links) => set({ links }),
  reset: () => set(initialState),
}));
