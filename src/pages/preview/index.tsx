import { LinkPreview } from "@/components/link-preview";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialPlatform } from "@/enums/social-platform.enum";
import { GET_PUBLIC_PREVIEW } from "@/gql/users";
import { useAuth } from "@/hooks/useAuth";
import { PlatformLink } from "@/types/links.types";
import { useQuery } from "@apollo/client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

export default function Preview() {
  const params = useParams();
  const { isAuthenticated, isLoading } = useAuth();
  const { data } = useQuery(GET_PUBLIC_PREVIEW, {
    variables: { userId: params.userId },
    onError: (error) => {
      toast.error("Failed to load your links.");
      console.error("Error fetching links:", error);
    },
    fetchPolicy: "network-only",
  });
  const [copied, setCopied] = useState(false);

  const { first_name, last_name, email, profile_picture_url } =
    data?.users[0] || {};
  const links: PlatformLink[] = data?.links;
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <main className="relative">
      <div className="absolute top-0-left-0 z-0 w-full h-80 bg-purple rounded-b-[32px]"></div>
      <header className=" h-32 md:p-6 relative z-10">
        <nav className="h-20 flex justify-between items-center w-full ps-6 pe-4  bg-white font-semibold md:rounded-lg">
          {isLoading && (
            <>
              <Skeleton className="w-24 h-8 rounded-md" />
              <Skeleton className="w-24 h-8 rounded-md" />
            </>
          )}
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="rounded-sm capitalize px-6 py-2 text-purple flex space-x-2 items-center justify-center"
              >
                Back to Editor
              </Link>
              <Button onClick={handleShare} className="flex items-center gap-2">
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                Share Link
              </Button>
            </>
          )}
        </nav>
      </header>

      <div className="w-max mx-auto relative mt-10">
        <div className="bg-white w-80  p-6 rounded-md">
          <div className="bg-grey-light w-24 h-24 mx-auto rounded-full p-1">
            {isLoading ? (
              <Skeleton className="w-24 h-24 rounded-full" />
            ) : profile_picture_url ? (
              <img
                className="w-24 h-24 object-cover object-top rounded-full border-2 border-purple"
                src={profile_picture_url}
                alt={`${first_name} ${last_name}`}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-grey-light" />
            )}
          </div>
          <div className="text-center mt-4 mb-16">
            {isLoading ? (
              <>
                <Skeleton className="w-32 h-6 mx-auto mb-2" />
                <Skeleton className="w-40 h-4 mx-auto" />
              </>
            ) : (
              <>
                {first_name || last_name ? (
                  <h2 className="text-lg font-bold">
                    {first_name} {last_name}
                  </h2>
                ) : (
                  <div className="bg-grey-light mx-auto rounded w-32 h-6 mb-2" />
                )}
                {email ? (
                  <p className="text-sm text-grey">{email}</p>
                ) : (
                  <div className="w-40 h-4 mx-auto bg-grey-light rounded" />
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading
              ? [...Array(3)].map((_, idx) => (
                  <Skeleton
                    key={`loading-link-${idx}`}
                    className="w-full h-12 mb-4 rounded-md"
                  />
                ))
              : links?.length
                ? links.map(({ platform, url }) => (
                    <LinkPreview
                      key={platform}
                      platform={platform as SocialPlatform}
                      isPreview
                      url={url}
                    />
                  ))
                : [...Array(2)].map((_, idx) => (
                    <div
                      key={`placeholder-${idx}`}
                      className="w-full h-12 bg-grey-light rounded-md mb-4"
                    />
                  ))}
          </div>
        </div>
      </div>
    </main>
  );
}
