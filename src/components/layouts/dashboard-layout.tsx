import { Outlet, useNavigate } from "react-router";
import Navbar from "./navbar";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/graphql/user";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { data } = useQuery(GET_USER_PROFILE, {
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
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar userId={data?.users[0].id} />
      <main className="p-4 ">
        <Outlet />
      </main>
    </div>
  );
}
