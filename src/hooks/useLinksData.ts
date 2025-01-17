import { useQuery } from "@apollo/client";
import { GET_USER_LINKS } from "@/gql/links";
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

  return {
    data,
    loading: queryLoading,
    error: queryError,
  };
}
