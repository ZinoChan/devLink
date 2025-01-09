import { Icons } from "@/components/icons";
import { platforms } from "@/constants/data";
import * as z from "zod";

export const linkSchema = z.object({
  platform: z.enum(platforms as unknown as [keyof typeof Icons]),
  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
  id: z.string().optional(),
});

export const LinksSchema = z.object({
  links: z.array(linkSchema).optional(),
});

export type LinksValues = z.infer<typeof LinksSchema>;
