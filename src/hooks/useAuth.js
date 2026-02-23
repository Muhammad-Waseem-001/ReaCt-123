import { useUser } from "@clerk/clerk-react";

export const useAuth = () => {
  const { user, isLoaded } = useUser();
  return {
    user,
    role: user?.publicMetadata?.role || "user",
    isLoaded,
  };
};