import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider, useUser } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppWrapper = () => {
  const { isLoaded } = useUser();
  if (!isLoaded) return <div>Loading...</div>;
  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <AppWrapper />
  </ClerkProvider>
);