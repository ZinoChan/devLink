import {
  DELETE_LINKS,
  GET_USER_LINKS,
  INSERT_LINKS,
  UPDATE_LINK,
} from "@/gql/links";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

export function useLinkMutations() {
  const [insertLinks, { loading: insertLoading, error: insertError }] =
    useMutation(INSERT_LINKS, {
      onError: (error) => {
        console.error("Insert mutation error:", error);
        toast.error("Failed to add links. Please try again.");
      },
      onCompleted: () => {
        toast.success("Links saved successfully!");
      },
      update: (cache, { data }) => {
        if (!data?.insert_links?.returning) return;
        const existingLinks = cache.readQuery({
          query: GET_USER_LINKS,
        });
        cache.writeQuery({
          query: GET_USER_LINKS,
          data: {
            users: existingLinks?.users ?? [],
            links: [
              ...(existingLinks?.links ?? []),
              ...data.insert_links.returning,
            ],
          },
        });
      },
    });

  const [deleteLinks, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LINKS, {
      onError: (error) => {
        toast.error("Failed to delete links");
        console.error("Delete error:", error);
      },
      update: (cache, { data }) => {
        if (!data?.delete_links?.returning) return;
        for (const link of data.delete_links.returning) {
          const fragmentRef = cache.identify({
            id: link.id,
            __typename: "links",
          });
          cache.evict({ id: fragmentRef });
        }
      },
    });

  const [updateLinks, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_LINK, {
      onError: (error) => {
        console.error("Update mutation error:", error);
        toast.error("Failed to update links. Please try again.");
      },
      onCompleted: () => {
        toast.success("Links updated successfully!");
      },
      update: (cache, { data }) => {
        if (!data?.update_links?.returning) return;
        const updatedLinks = data.update_links.returning;
        const existingLinks = cache.readQuery({
          query: GET_USER_LINKS,
        });
        if (!existingLinks) return;
        const newLinks = existingLinks.links.map((link) => {
          const updatedLink = updatedLinks.find((l) => l.id === link.id);
          return updatedLink ?? link;
        });

        cache.writeQuery({
          query: GET_USER_LINKS,
          data: {
            users: existingLinks.users,
            links: newLinks,
          },
        });
      },
    });

  return {
    insertLinks,
    updateLinks,
    deleteLinks,
    loading: insertLoading || deleteLoading || updateLoading,
    error: insertError || deleteError || updateError,
  };
}
