import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { fetchProductSummary } from "../api/productsApi";
import { fetchUserSummary } from "../api/usersApi";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import useRole from "../hooks/useRole";

export default function DashboardPage() {
  const { user } = useUser();
  const { role, isAdmin } = useRole();

  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const firstName = user?.firstName || user?.username || "there";

  useEffect(() => {
    let active = true;

    const loadSummary = async () => {
      setLoading(true);

      try {
        const [productSummary, userSummary] = await Promise.all([
          fetchProductSummary(),
          fetchUserSummary(),
        ]);

        if (active) {
          setMetrics({
            ...productSummary,
            ...userSummary,
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadSummary();

    return () => {
      active = false;
    };
  }, []);

  const cards = useMemo(
    () => [
      { label: "Total Products", value: loading ? "..." : metrics.totalProducts, tone: "teal" },
      { label: "Low Stock Products", value: loading ? "..." : metrics.lowStockProducts, tone: "amber" },
      { label: "Total Users", value: loading ? "..." : metrics.totalUsers, tone: "blue" },
      {
        label: isAdmin ? "Admin Accounts" : "Active Users",
        value: loading ? "..." : isAdmin ? metrics.adminUsers : metrics.activeUsers,
        tone: "green",
      },
    ],
    [isAdmin, loading, metrics]
  );

  const quickLinks = [
    {
      label: "Manage Products",
      description: "Create, update, search, and paginate product records.",
      to: "/products",
    },
    {
      label: "Manage Users",
      description: "Admin-only controls for user role and status CRUD.",
      to: "/admin/users",
      adminOnly: true,
    },
  ].filter((item) => !item.adminOnly || isAdmin);

  return (
    <section className="page-grid">
      <article className="panel hero-panel">
        <PageHeader
          kicker="Overview"
          subtitle="Clerk auth, protected routes, role-based access, and reusable CRUD workflows."
          title={`Welcome back, ${firstName}`}
        />

        <div className="hero-chips">
          <span className="chip">Role: {role}</span>
          <span className="chip">Auth: Clerk</span>
          <span className="chip">Router: React Router</span>
          <span className="chip">State: Context API</span>
        </div>
      </article>

      <div className="stats-grid">
        {cards.map((card) => (
          <StatCard key={card.label} label={card.label} tone={card.tone} value={card.value} />
        ))}
      </div>

      <article className="panel">
        <PageHeader
          kicker="Actions"
          subtitle="Jump directly to core modules."
          title="Quick Navigation"
        />

        <div className="action-grid">
          {quickLinks.map((link) => (
            <Link key={link.to} className="action-card" to={link.to}>
              <h4>{link.label}</h4>
              <p className="muted">{link.description}</p>
            </Link>
          ))}
        </div>
      </article>
    </section>
  );
}
