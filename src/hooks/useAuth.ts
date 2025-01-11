import { CHECK_USER } from "@/graphql/user";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { loading, error, data } = useQuery(CHECK_USER);

  useEffect(() => {
    const hasToken = localStorage.getItem("access_token");
    if (!hasToken) return;

    if (!loading) {
      if (error || !data?.users[0]?.id) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [data, error, loading]);

  return {
    isAuthenticated,
    isLoading: loading,
  };
}
