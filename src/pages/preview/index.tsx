import PreviewComponent from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_PUBLIC_PREVIEW } from "@/gql/users";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

export default function Preview() {
  const params = useParams();
  const { isAuthenticated, isLoading } = useAuth();

  const { data, loading: previewLoading } = useQuery(GET_PUBLIC_PREVIEW, {
    variables: { userId: params.userId },
    onError: (error) => {
      toast.error("Failed to load your links.");
      console.error("Error fetching links:", error);
    },
    fetchPolicy: "network-only",
  });

  const [copied, setCopied] = useState(false);
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
      {data && (
        <PreviewComponent
          variant="normal"
          isLoading={previewLoading}
          links={data?.links || []}
          user={{ ...data?.users[0], id: "random" }}
        />
      )}
    </main>
  );
}
