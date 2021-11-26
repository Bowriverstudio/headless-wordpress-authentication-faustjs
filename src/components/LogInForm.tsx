import * as React from "react";
import { client } from "client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LogInForm() {
  const router = useRouter();
  const { useLogin } = client.auth;
  const { login, isLoading, data, error } = useLogin();

  const [usernameEmail, setUserNameEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = data?.error || error?.message;

  if (data && data.code) {
    router.push("/logged-in");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(usernameEmail, password);
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="usernameEmail">Username or Email</label>
        <input
          type="text"
          value={usernameEmail}
          autoComplete="email"
          onChange={(e) => setUserNameEmail(e.target.value)}
          id="usernameEmail"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <Link href="/forgot-password">Forgot password?</Link>
        {errorMessage && typeof errorMessage === "string" && (
          <>
            <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
          </>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </fieldset>
      <p className="account-sign-up-message">
        Don&#39;t have an account yet? <Link href="/sign-up">Sign up</Link>
      </p>
    </form>
  );
}
