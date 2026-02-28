import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();
  const { role, isLoaded: isRoleLoaded } = useRole();

  if (!isLoaded || !isRoleLoaded) {
    return (
      <section className="status-screen">
        <div className="loader" />
        <p className="muted">Preparing your workspace...</p>
      </section>
    );
  }

  if (!isSignedIn) {
    return <Navigate replace state={{ from: location.pathname }} to="/sign-in" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate replace to="/unauthorized" />;
  }

  return <Outlet />;
}
