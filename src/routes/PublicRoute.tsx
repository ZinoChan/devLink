import { CHECK_USER } from "@/graphql/user";
import { useQuery } from "@apollo/client";
import { LoaderCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router";

type PublicRouteProps = {
  children: React.ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps) {
  const { loading, data } = useQuery(CHECK_USER);

  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoaderCircle
            className="animate-spin text-purple mx-auto mb-4"
            size={48}
          />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (data?.users[0]?.id) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}
