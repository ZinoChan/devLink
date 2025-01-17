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

  return {
    data,
    loading: queryLoading,
    error: queryError,
  };
}
