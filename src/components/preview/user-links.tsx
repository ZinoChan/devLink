import { LinkPreview } from "@/components/link-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialPlatform } from "@/enums/social-platform.enum";
import { LinkType } from "@/types";
import { LinksInput } from "@/validation/link.schema";

type UserLinksProps = {
  isLoading: boolean;
  links: LinkType[] | LinksInput[];
  variant?: "preview" | "full";
};

export default function UserLinks({
  isLoading,
  links,
  variant = "full",
}: UserLinksProps) {
  if (isLoading) {
    return [...Array(3)].map((_, idx) => (
      <Skeleton
        key={`loading-link-${idx}`}
        className="w-full h-12 mb-4 rounded-md"
      />
    ));
  }

  const displayLinks = links
    .slice(0, 5)
    .map(({ platform, url }, idx) => (
      <LinkPreview
        key={`${url}-${platform}-${idx}`}
        platform={platform as SocialPlatform}
        isPreview={variant === "preview"}
        url={url}
      />
    ));

  const placeholders =
    links.length < 2
      ? [...Array(2 - links.length)].map((_, idx) => (
          <div
            key={`placeholder-${idx}`}
            className="w-full h-12 bg-grey-light rounded-md mb-4"
          />
        ))
      : null;

  return (
    <>
      {displayLinks}
      {placeholders}
    </>
  );
}
