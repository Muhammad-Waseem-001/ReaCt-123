import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
  const { user, role: userRole } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;