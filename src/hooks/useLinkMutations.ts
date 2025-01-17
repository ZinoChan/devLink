import { DELETE_LINKS, INSERT_LINKS, UPDATE_LINK } from "@/gql/links";
import { gql, Reference, useMutation } from "@apollo/client";
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
        cache.modify({
          fields: {
            links(existingLinks = []) {
              const newLinkRefs = data.insert_links?.returning.map((link) =>
                cache.writeFragment({
                  data: link,
                  fragment: gql`
                    fragment NewLink on links {
                      id
                      platform
                      url
                      display_order
                    }
                  `,
                })
              );
              return [...existingLinks, ...(newLinkRefs || [])];
            },
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
        cache.modify({
          fields: {
            links(existingLinks: readonly Reference[], { readField }) {
              const deletedLinkIds = data.delete_links?.returning.map(
                (link) => link.id
              );
              return existingLinks.filter(
                (linkRef) => !deletedLinkIds?.includes(readField("id", linkRef))
              );
            },
          },
        });
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
        const updatedIds = updatedLinks.map((link) => link.id);

        cache.modify({
          fields: {
            //@ts-expect-error - couldn't get the right type
            links(existingLinks: unknown[], { readField }) {
              return existingLinks.map((linkRef) => {
                //@ts-expect-error - existingLinks type needs to be defined
                const linkId = readField("id", linkRef);
                if (updatedIds.includes(linkId)) {
                  const updatedLink = updatedLinks.find(
                    (link) => link.id === linkId
                  );
                  return cache.writeFragment({
                    data: updatedLink,
                    fragment: gql`
                      fragment UpdatedLink on links {
                        id
                        platform
                        url
                        display_order
                      }
                    `,
                  });
                }
                return linkRef;
              });
            },
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
