import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  profile_picture_url: z.string().url("Invalid image URL").optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
