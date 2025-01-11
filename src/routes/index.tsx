import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthCallback from "@/pages/auth/callback";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import Preview from "@/pages/preview";
import ProfileDetails from "@/pages/profile";
import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export default function AppRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/callback" element={<AuthCallback />} />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileDetails />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/preview/:userId" element={<Preview />} />
    </Routes>
  );
}
