import { ReactNode } from "react";
import { client } from "client";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { useAuth } = client.auth;
  const { isAuthenticated } = client.auth.useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <div>Loading...</div>;
}
