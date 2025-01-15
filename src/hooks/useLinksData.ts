import { useQuery, useMutation } from "@apollo/client";
import {
  DELETE_LINKS,
  GET_USER_LINKS,
  INSERT_LINKS,
  UPDATE_LINK,
} from "@/graphql/links";
import toast from "react-hot-toast";

export function useLinksData() {
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_USER_LINKS, {
    onError: (error) => {
      toast.error("Failed to load your links. Please refresh the page.");
      console.error("Error fetching links:", error);
    },
  });

  const [insertLinks, { loading: insertLoading, error: insertError }] =
    useMutation(INSERT_LINKS, {
      onError: (error) => {
        console.error("Insert mutation error:", error);
        toast.error("Failed to add links. Please try again.");
      },
      onCompleted: () => {
        toast.success("Links saved successfully!");
      },
    });

  const [deleteLinks, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LINKS, {
      onError: (error) => {
        toast.error("Failed to delete links");
        console.error("Delete error:", error);
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
      refetchQueries: [{ query: GET_USER_LINKS }],
    });

  return {
    data,
    queryLoading,
    queryError,
    insertLinks,
    deleteLinks,
    updateLinks,
    loading: queryLoading || insertLoading || deleteLoading || updateLoading,
    error: queryError || insertError || deleteError || updateError,
  };
}
