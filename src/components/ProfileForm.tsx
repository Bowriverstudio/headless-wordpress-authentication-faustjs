import React, { useState } from "react";
import { client, UpdateUserInput } from "client";

export default function ProfileForm() {
  const [view, setView] = useState<"Viewing" | "Editing">("Viewing");
  const [wasProfileUpdated, setWasProfileUpdated] = useState<boolean>(false);

  const { isLoading: isAuthLoading, isAuthenticated } = client?.auth?.useAuth();
  const viewer = client?.auth?.useQuery()?.viewer;
  const [updateUser, { data, isLoading, error }] = client.auth.useMutation(
    (mutation, { id, firstName, lastName, email }: UpdateUserInput) => {
      const { user } = mutation.updateUser({
        input: {
          id,
          firstName,
          lastName,
        },
      });

      if (user) {
        setWasProfileUpdated(true);
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
        };
      }
    },
    {
      refetchQueries: [client?.auth?.useQuery()?.viewer],
      awaitRefetchQueries: false,
      // suspense: false,
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);

    updateUser({
      args: {
        id: viewer?.id,
        ...values,
      },
    })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setView("Viewing");
      });
  }

  return (
    <>
      {wasProfileUpdated ? (
        <p className="profile-update-confirmation">
          ✅ Profile details have been updated.
        </p>
      ) : null}
      {view == "Viewing" && (
        <>
          <div>First Name: {viewer?.firstName}</div>
          <div>Last Name: {viewer?.lastName}</div>
          <button onClick={() => setView("Editing")}>Edit Profile</button>
        </>
      )}

      {view == "Editing" && (
        <form method="post" onSubmit={handleSubmit}>
          <fieldset disabled={isLoading} aria-busy={isLoading}>
            <label htmlFor="profile-first-name">First Name</label>
            <input
              id="profile-first-name"
              type="text"
              name="firstName"
              defaultValue={viewer?.firstName || ""}
              autoComplete="given-name"
            />
            <label htmlFor="profile-last-name">Last Name</label>
            <input
              id="profile-last-name"
              type="text"
              name="lastName"
              defaultValue={viewer?.lastName || ""}
              autoComplete="family-name"
            />
            {error ? <p className="error-message">{error.message}</p> : null}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Update Profile"}
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
}
