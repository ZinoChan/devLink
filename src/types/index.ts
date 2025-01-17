import { Links, Users } from "@/__generated__/graphql";

export type LinkType = Omit<
  Links,
  "user" | "created_at" | "updated_at" | "user_id"
>;

export type UserType = Omit<
  Users,
  "auth0_id" | "created_at" | "links" | "updated_at"
>;
