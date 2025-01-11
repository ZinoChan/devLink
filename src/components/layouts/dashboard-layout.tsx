import { Outlet } from "react-router";
import Navbar from "./navbar";

export default function DashboardLayout() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <main className="p-4 ">
        <Outlet />
      </main>
    </div>
  );
}
