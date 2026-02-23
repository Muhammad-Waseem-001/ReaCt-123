import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { role } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/users">Users</Link>
      {role === "admin" && <Link to="/admin">Admin Panel</Link>}
      <div style={{ marginLeft: "auto" }}>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;