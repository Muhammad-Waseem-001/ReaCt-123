import React from "react";

export default function PageHeader({ title, subtitle, actions, kicker = "Workspace" }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}
