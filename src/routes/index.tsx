import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthCallback from "@/pages/auth/callback";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import ProfileDetails from "@/pages/profile";
import { Route, Routes } from "react-router";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/callback"
        Component={(props) => <AuthCallback {...props} />}
      />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileDetails />} />
      </Route>
    </Routes>
  );
}
