import { useEffect } from "react";
import { Auth0DecodedHash, Auth0ParseHashError } from "auth0-js";
import { useLocation, useNavigate } from "react-router";
import { auth } from "@/services/auth0.service";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

interface UserInfo {
  id: string;
  email: string;
}

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserInfo = async (accessToken: string): Promise<UserInfo> => {
    try {
      const response = await fetch(import.meta.env.VITE_HASURA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: `
              query GetUserInfo {
                users {
                  id
                  email
                }
              }
            `,
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.users[0];
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleAuthSuccess = async (accessToken: string) => {
    try {
      localStorage.setItem("access_token", accessToken);

      const userInfo = await fetchUserInfo(accessToken);

      localStorage.setItem("user_info", JSON.stringify(userInfo));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error in auth success handler:", error);
      navigate("/", {
        state: {
          error: "Failed to fetch user information. Please try again.",
        },
      });
      toast.error("Failed to fetch user information. Please try again.");
    }
  };

  useEffect(() => {
    const processAuth = async () => {
      const existingToken = localStorage.getItem("access_token");
      if (existingToken) {
        navigate("/dashboard");
        return;
      }
      auth.parseHash(
        {
          hash: location.hash,
        },
        async (
          err: Auth0ParseHashError | null,
          authResult: Auth0DecodedHash | null
        ) => {
          if (err) {
            console.error("Auth0 hash parsing error:", err);
            toast.error("Authentication failed. Please try again.");
            return;
          }

          if (authResult && authResult.idToken) {
            console.log(authResult);
            await handleAuthSuccess(authResult.idToken);
          } else {
            console.error("No access token found in auth result");
            navigate("/", {
              state: {
                error: "No access token received. Please try again.",
              },
            });
          }
        }
      );
    };

    processAuth();
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Completing Authentication</h2>
        <p className="mb-4">Please wait while we set up your account...</p>
        <div className="w-max mx-auto">
          <LoaderCircle className="animate-spin text-purple" size={48} />
        </div>
      </div>
    </div>
  );
}
