import * as z from "zod";

export const linkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
  is_active: z.boolean().optional(),
  id: z.string().optional(),
});

export const LinksSchema = z.object({
  links: z.array(linkSchema).optional(),
});

export type LinksValues = z.infer<typeof LinksSchema>;
