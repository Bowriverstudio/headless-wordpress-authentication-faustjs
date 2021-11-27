import React from "react";
import { client, SendPasswordResetEmailInput } from "client";

export default function SendPasswordResetEmailForm() {
  const [sendPasswordResetEmail, { data, isLoading, error }] =
    client.useMutation(
      (mutation, { username }: SendPasswordResetEmailInput) => {
        const result = mutation.sendPasswordResetEmail({
          input: {
            username,
          },
        });
        return result.user;
      }
    );

  const wasEmailSent = Boolean(data?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(data);
    sendPasswordResetEmail({
      args: {
        username: email as string,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  if (wasEmailSent) {
    return (
      <p>
        {" "}
        Please check your email. A password reset link has been sent to you.
      </p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <p>
        Enter the email associated with your account and you&#39;ll be sent a
        link to reset your password.
      </p>
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="password-reset-email">Email</label>
        <input
          id="password-reset-email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        {error ? <p className="error-message">{error.message}</p> : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send password reset email"}
        </button>
      </fieldset>
    </form>
  );
}
