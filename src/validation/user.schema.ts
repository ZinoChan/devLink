import { z } from "zod";
import { profileSchema } from "./profile.schema";
import { linkSchema } from "./link.schema";

export const userDataSchema = z.object({
  profile: profileSchema,
  links: z.array(linkSchema).optional().default([]),
});

export type UserData = z.infer<typeof userDataSchema>;
