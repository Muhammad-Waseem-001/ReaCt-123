import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <div className="background-grid" />
      <div className="background-orb orb-a" />
      <div className="background-orb orb-b" />

      <TopNav />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
