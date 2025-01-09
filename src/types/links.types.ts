import { Icons } from "@/components/icons";

export type PlatformLink = {
  platform: keyof typeof Icons;
  url: string;
  id?: string;
  display_order?: number;
  created_at?: string;
};
