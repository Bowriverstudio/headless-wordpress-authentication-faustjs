import React, { useState } from "react";
import { client, SendPasswordResetEmailInput } from "client";

export default function SendPasswordResetEmailForm() {
  const [sendMessage, setSendMessage] = useState<boolean>(false);
  console.log("Send Password Reset Form");
  const [sendPasswordResetEmail, { data, isLoading, error }] =
    client.useMutation(
      (mutation, { username }: SendPasswordResetEmailInput) => {
        const result = mutation.sendPasswordResetEmail({
          input: {
            username,
          },
        });

        // Bug - expect the
        if (Boolean(result?.user?.databaseId)) {
          console.log("User exists");
        } else {
          console.log("No user");
        }
        setSendMessage(true);
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
      console.error("CATCH", error);
    });
  }

  return (
    <>
      {sendMessage ? (
        <>Should the email exist we will send a message</>
      ) : (
        <form method="post" onSubmit={handleSubmit}>
          <p>
            Enter the email associated with your account and you&#39;ll be sent
            a link to reset your password.
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
      )}
    </>
  );
}
