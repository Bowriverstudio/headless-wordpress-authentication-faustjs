import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

import { client } from "client";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const { useAuth } = client.auth;
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth({ shouldRedirect: false });

  console.log("UnAuth", isLoading, isAuthenticated);
  // Navigate authenticated users to Members page.
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/members");
    }
  }, [router, isLoading, isAuthenticated]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }
  return <div>Loading...</div>;
}
