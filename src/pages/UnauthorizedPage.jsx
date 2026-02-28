import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <section className="status-screen">
      <article className="panel status-panel">
        <p className="eyebrow">Access Denied</p>
        <h2>Unauthorized</h2>
        <p className="muted">Your account does not have permission to open this page.</p>
        <Link className="btn btn-primary" to="/">
          Back to Dashboard
        </Link>
      </article>
    </section>
  );
}
