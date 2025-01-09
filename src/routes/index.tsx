import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthCallback from "@/pages/auth/callback";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import Preview from "@/pages/preview";
import ProfileDetails from "@/pages/profile";
import { Route, Routes } from "react-router";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<AuthCallback />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileDetails />} />
      </Route>
      <Route path="/preview/:userId" element={<Preview />} />
    </Routes>
  );
}
