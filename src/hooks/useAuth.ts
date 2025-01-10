import { CHECK_USER } from "@/graphql/user";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [checkAuth, { loading }] = useLazyQuery(CHECK_USER, {
    onCompleted: () => setIsAuthenticated(true),
    onError: () => setIsAuthenticated(false),
  });
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, isLoading: loading };
}
