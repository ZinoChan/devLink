import { CHECK_USER } from "@/graphql/user";
import { useQuery } from "@apollo/client";
import { LoaderCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { loading, error, data } = useQuery(CHECK_USER);
  const location = useLocation();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoaderCircle
            className="animate-spin text-purple mx-auto mb-4"
            size={48}
          />
          <p className="text-gray-600">Verifying your session...</p>
        </div>
      </div>
    );
  if (error || !data?.users[0]?.id)
    return <Navigate to="/" replace state={{ from: location }} />;

  return children;
}
