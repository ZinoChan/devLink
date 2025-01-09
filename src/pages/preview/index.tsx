import { LinkPreview } from "@/components/link-preview";
import { Button } from "@/components/ui/button";
import { GET_PUBLIC_PREVIEW } from "@/graphql/user";
import { PlatformLink } from "@/types/links.types";
import { useQuery } from "@apollo/client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

export default function Preview() {
  const params = useParams();
  const { data } = useQuery(GET_PUBLIC_PREVIEW, {
    variables: { userId: params.userId },
    onError: (error) => {
      toast.error("Failed to load your links.");
      console.error("Error fetching links:", error);
    },
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
    <main>
      <header className="bg-grey-light h-32 md:p-6">
        <nav className="h-20 flex justify-between items-center w-full ps-6 pe-4  bg-white font-semibold md:rounded-lg">
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
        </nav>
      </header>

      <div className="w-max mx-auto relative">
        <div className="bg-white w-80  p-6 rounded-md">
          <div className="bg-grey-light w-24 h-24 mx-auto rounded-full p-1">
            {profile_picture_url && (
              <img
                className="w-24 h-24 object-cover object-top rounded-full border-2 border-purple"
                src={profile_picture_url || "/images/default-profile.jpg"}
                alt={`${first_name} ${last_name}`}
              />
            )}
          </div>
          <div className="text-center mt-4 mb-16">
            <h2 className="text-lg font-bold">
              {first_name} {last_name}
            </h2>
            <p className="text-sm text-grey">{email}</p>
          </div>
          <div className="flex flex-col">
            {links?.map(({ platform }) => (
              <LinkPreview key={platform} platform={platform} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
