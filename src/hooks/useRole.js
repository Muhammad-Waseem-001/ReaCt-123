import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function normalizeRole(rawRole) {
  if (typeof rawRole !== "string") {
    return "";
  }

  return rawRole.trim().toLowerCase();
}

export default function useRole() {
  const { user, isLoaded } = useUser();

  const role = useMemo(() => {
    const metadataRole = normalizeRole(user?.publicMetadata?.role);
    if (metadataRole === "admin" || metadataRole === "user") {
      return metadataRole;
    }

    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (email && adminEmails.includes(email)) {
      return "admin";
    }

    return "user";
  }, [user]);

  return {
    role,
    isAdmin: role === "admin",
    isLoaded,
  };
}
