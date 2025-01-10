import PhonePreview from "@/components/phone-preview";
import { GET_USER_PROFILE } from "@/graphql/user";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LinkForm from "./link-form";
import { LoaderCircle } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { loading } = useQuery(GET_USER_PROFILE, {
    onError: (error) => {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_id");
      localStorage.removeItem("access_token");
      navigate("/", {
        state: { error: "Session expired or invalid. Please log in again." },
      });

      toast.error("Session expired or invalid. Please log in again.");
    },
  });

  if (loading)
    return (
      <div className="flex items-center justify-center flex-col h-80">
        <p className="mb-4">Loading Your data...</p>
        <div className="w-max mx-auto">
          <LoaderCircle className="animate-spin text-purple" size={48} />
        </div>
      </div>
    );

  return (
    <section className=" lg:grid grid-cols-3 gap-6">
      <PhonePreview />
      <LinkForm />
    </section>
  );
}
