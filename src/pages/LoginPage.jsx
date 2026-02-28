import React from "react";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function LoginPage() {
  return (
    <section className="status-screen">
      <SignedIn>
        <Navigate replace to="/" />
      </SignedIn>

      <SignedOut>
        <article className="panel auth-panel">
          <PageHeader
            kicker="Authentication"
            subtitle="Sign in with Clerk to access protected routes."
            title="Role Dashboard Login"
          />

          <div className="clerk-wrapper">
            <SignIn fallbackRedirectUrl="/" path="/sign-in" routing="path" />
          </div>
        </article>
      </SignedOut>
    </section>
  );
}
