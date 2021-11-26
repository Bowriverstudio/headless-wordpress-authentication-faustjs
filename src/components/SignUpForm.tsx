import React from "react";
import { client, CreateUserInput } from "client";
import Link from "next/link";

export interface FormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function SignUpForm() {
  const [registerUser, { data, isLoading, error }] = client.useMutation(
    (mutation, { username, email, firstName, lastName }: FormData) => {
      const result = mutation.registerUser({
        input: {
          username,
          email,
          firstName,
          lastName,
        },
      });
      console.log("REsult", result);
      return result.user;
    }
  );

  const wasSignUpSuccessful = Boolean(data?.databaseId);

  console.log("data", data, data?.databaseId);
  console.log("error", error);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data) as unknown as FormData;
    values["username"] = values["email"];

    await registerUser({
      args: {
        ...values,
      },
    })
      .catch((err) => {
        console.log("Error catch", err);
      })
      .then((user) => {
        console.log("THen", user);
      });
  };

  if (wasSignUpSuccessful) {
    return (
      <p>
        Thanks! Check your email – an account confirmation link has been sent to
        you.
      </p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          autoComplete="given-name"
          required
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          autoComplete="family-name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="username"
          required
        />

        {/* {error ? (
          error.message.includes("This username is already registered") ? (
            <p className="error-message">
              You&#39;re already signed up! <Link to="/log-in">Log in</Link>
            </p>
          ) : (
            <p className="error-message">{error.message}</p>
          )
        ) : null} */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </fieldset>
      <p>
        Already have an account?{" "}
        <Link href="/log-in">
          <a>Log in</a>
        </Link>
      </p>
    </form>
  );
}
