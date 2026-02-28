import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { AppDataProvider } from "./context/AppDataContext";
import "./index.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const root = ReactDOM.createRoot(document.getElementById("root"));

if (!publishableKey) {
  root.render(
    <React.StrictMode>
      <div className="config-screen">
        <div className="config-card">
          <p className="eyebrow">Configuration Required</p>
          <h1>Missing Clerk Publishable Key</h1>
          <p>
            Add <code>VITE_CLERK_PUBLISHABLE_KEY</code> in <code>.env</code> and restart the dev
            server.
          </p>
          <p className="muted">
            Optional: add <code>VITE_ADMIN_EMAILS</code> as comma-separated addresses for admin
            access.
          </p>
        </div>
      </div>
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={publishableKey} signInUrl="/sign-in">
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
}
