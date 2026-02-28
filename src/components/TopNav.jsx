import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";

const baseLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Products", to: "/products" },
];

function navClassName({ isActive }) {
  return `nav-link${isActive ? " is-active" : ""}`;
}

export default function TopNav() {
  const { isAdmin, role } = useRole();
  const links = isAdmin ? [...baseLinks, { label: "Admin Users", to: "/admin/users" }] : baseLinks;

  return (
    <header className="top-nav">
      <div className="brand">
        <span className="brand-mark" />
        <div>
          <p className="eyebrow">Role-Based Dashboard</p>
          <h1>Team Console</h1>
        </div>
      </div>

      <SignedIn>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink key={link.to} className={navClassName} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </SignedIn>

      <div className="nav-actions">
        <SignedIn>
          <span className={`role-chip ${role}`}>{role}</span>
          <UserButton afterSignOutUrl="/sign-in" />
          <SignOutButton>
            <button className="btn btn-ghost" type="button">
              Logout
            </button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary" type="button">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
