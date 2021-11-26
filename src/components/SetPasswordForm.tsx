import React, { useState } from "react";
import { client, ResetUserPasswordInput } from "client";
import Link from "next/link";

interface Props {
  resetKey: string;
  login: string;
}

export default function SetPasswordForm({ resetKey: key, login }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [clientErrorMessage, setClientErrorMessage] = useState("");
  const [resetUserPassword, { data, isLoading, error }] = client.useMutation(
    (mutation, { login, key, password }: ResetUserPasswordInput) => {
      const result = mutation.resetUserPassword({
        input: {
          login,
          key,
          password,
        },
      });
      console.log("REsult", result);
      return result.user;
    }
  );

  const wasPasswordReset = Boolean(data?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    resetUserPassword({
      args: {
        key,
        login,
        password,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  function validate() {
    setClientErrorMessage("");

    const isPasswordLongEnough = password.length >= 5;
    if (!isPasswordLongEnough) {
      setClientErrorMessage("Password must be at least 5 characters.");
      return false;
    }

    const doPasswordsMatch = password === passwordConfirm;
    if (!doPasswordsMatch) {
      setClientErrorMessage("Passwords must match.");
      return false;
    }

    return true;
  }

  if (wasPasswordReset) {
    return (
      <>
        <p>Your new password has been set.</p>
        <Link href="/log-in">Log in</Link>
      </>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="new-password">Password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          autoComplete="new-password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label htmlFor="password-confirm">Confirm Password</label>
        <input
          id="password-confirm"
          type="password"
          value={passwordConfirm}
          autoComplete="new-password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
          required
        />
        {clientErrorMessage ? (
          <p className="error-message">{clientErrorMessage}</p>
        ) : null}
        {error ? <p className="error-message">{error.message}</p> : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save password"}
        </button>
      </fieldset>
    </form>
  );
}
