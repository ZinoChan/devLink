import { useQuery } from "@apollo/client";
import { GET_USER_LINKS } from "@/gql/links";
import toast from "react-hot-toast";
import { usePreviewStore } from "@/lib/zustand";

export function useLinksData() {
  const { updateLinks, updateUser } = usePreviewStore();

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_USER_LINKS, {
    onCompleted: (data) => {
      updateLinks(data.links);
      updateUser(data.users[0]);
    },
    onError: (error) => {
      toast.error("Failed to load your links. Please refresh the page.");
      console.error("Error fetching links:", error);
    },
  });

  // const [deleteLinks, { loading: deleteLoading, error: deleteError }] =
  //   useMutation(DELETE_LINKS, {
  //     onError: (error) => {
  //       toast.error("Failed to delete links");
  //       console.error("Delete error:", error);
  //     },
  //   });

  // const [updateLinks, { loading: updateLoading, error: updateError }] =
  //   useMutation(UPDATE_LINK, {
  //     onError: (error) => {
  //       console.error("Update mutation error:", error);
  //       toast.error("Failed to update links. Please try again.");
  //     },
  //     onCompleted: () => {
  //       toast.success("Links updated successfully!");
  //     },
  //     refetchQueries: [{ query: GET_USER_LINKS }],
  //   });

  return {
    data,
    // queryLoading,
    // queryError,
    // insertLinks,
    // deleteLinks,
    // updateLinks,
    // loading: queryLoading || insertLoading || deleteLoading || updateLoading,
    // error: queryError || insertError || deleteError || updateError,
    loading: queryLoading,
    error: queryError,
  };
}
