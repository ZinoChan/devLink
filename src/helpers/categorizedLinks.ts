import { LinkType } from "@/lib/zustand";
import { PlatformLink } from "@/types/links.types";

export function categorizeLink(
  userLinks: PlatformLink[],
  existingLinks: LinkType[]
): {
  newLinks: PlatformLink[];
  updatedLinks: PlatformLink[];
  deletedLinks: string[];
} {
  const newLinks: PlatformLink[] = [];
  const updatedLinks: PlatformLink[] = [];
  const deletedLinks: string[] = [];

  const existingLinksMap = new Map(
    existingLinks.map((link) => [link.id, link])
  );

  userLinks.forEach((userLink) => {
    if (!userLink.id) {
      newLinks.push(userLink);
      return;
    }
    const existingLink = existingLinksMap.get(userLink.id);
    if (
      existingLink &&
      (existingLink.platform !== userLink.platform ||
        existingLink.url !== userLink.url)
    ) {
      updatedLinks.push(userLink);
    }
  });
  const userLinkIds = new Set(
    userLinks.filter((link) => link.id).map((link) => link.id as string)
  );
  existingLinks.forEach((existingLink) => {
    if (existingLink.id && !userLinkIds.has(existingLink.id)) {
      deletedLinks.push(existingLink.id);
    }
  });

  return {
    newLinks,
    updatedLinks,
    deletedLinks,
  };
}
