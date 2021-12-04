import React, { useState } from "react";
import { client, UpdateUserInput } from "client";

export default function ProfileForm() {
  const [view, setView] = useState<"Viewing" | "Editing">("Viewing");
  const { id, firstName, lastName } = client?.auth?.useQuery()?.viewer;
  const [updateUser, { data, isLoading, error }] = client.auth.useMutation(
    (mutation, { id, firstName, lastName }: UpdateUserInput) => {
      const result = mutation.updateUser({
        input: {
          id,
          firstName,
          lastName,
        },
      });

      return result.user;
    },
    {
      onCompleted(data) {},
      onError(error) {},
      refetchQueries: [client?.auth?.useQuery()?.viewer],
      awaitRefetchQueries: true,
      suspense: false,
    }
  );

  const wasProfileUpdated = Boolean(data?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);

    updateUser({
      args: {
        id,
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
          <div>First Name: {firstName}</div>
          <div>Last Name: {lastName}</div>
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
              defaultValue={firstName || ""}
              autoComplete="given-name"
            />
            <label htmlFor="profile-last-name">Last Name</label>
            <input
              id="profile-last-name"
              type="text"
              name="lastName"
              defaultValue={lastName || ""}
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
