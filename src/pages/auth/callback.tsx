import { useEffect } from "react";
import { Auth0DecodedHash, Auth0ParseHashError } from "auth0-js";
import { useLocation, useNavigate } from "react-router";
import { auth } from "@/services/auth0.service";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserInfo = async (
    accessToken: string
  ): Promise<{ id: string }> => {
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
                }
              }
        `,
      }),
    });

    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0].message);

    const userInfo = data.data?.users[0];

    if (!userInfo) throw new Error("No user data found");

    return userInfo;
  };

  const handleAuthSuccess = async (accessToken: string) => {
    try {
      localStorage.clear();

      localStorage.setItem("access_token", accessToken);

      const userInfo = await fetchUserInfo(accessToken);

      localStorage.setItem("user_info", JSON.stringify(userInfo));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log("AuthFailed:", err);
      toast.error("Authentication failed. Please try again.");
      localStorage.clear();
      navigate("/", {
        replace: true,
      });
    }
  };

  const parseAuthHash = async () => {
    return new Promise<Auth0DecodedHash | null>((resolve, reject) => {
      auth.parseHash(
        {
          hash: location.hash,
        },
        (
          err: Auth0ParseHashError | null,
          authResult: Auth0DecodedHash | null
        ) => {
          if (err) reject(err);
          else if (!authResult) reject(new Error("Auth failed"));
          else resolve(authResult);
        }
      );
    });
  };

  useEffect(() => {
    const processAuth = async () => {
      try {
        const existingToken = localStorage.getItem("access_token");
        if (existingToken) {
          // validate token
          await fetchUserInfo(existingToken);
          navigate("/dashboard", { replace: true });
          return;
        }
        const authResult = await parseAuthHash();
        if (!authResult?.idToken) throw new Error("invalid token");
        await handleAuthSuccess(authResult.idToken);
      } catch (error) {
        console.log("Error processing auth:", error);
      }
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
