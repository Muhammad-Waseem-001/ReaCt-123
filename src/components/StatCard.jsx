import React from "react";

export default function StatCard({ label, value, tone = "neutral" }) {
  return (
    <article className={`panel stat-card tone-${tone}`}>
      <p className="muted">{label}</p>
      <h3>{value}</h3>
    </article>
  );
}
