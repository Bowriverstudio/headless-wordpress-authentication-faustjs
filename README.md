# Next.js Headless Wordpress Authentication Faustjs Example

This POC is the faustjs sample, with Authentication and is a hybrid of these resources:

- [headless-wordpress-authentication-native-cookies-gatsby](https://github.com/kellenmace/headless-wordpress-authentication-native-cookies-gatsby)

- [headless-wordpress-authentication-native-cookies](https://developers.wpengine.com/blog/headless-wordpress-authentication-native-cookies)

- [faustjs - guides - auth](https://faustjs.org/docs/next/guides/auth)

## Setup

Follow the steps here: [Faustjs Quick Start](https://github.com/wpengine/faustjs#quick-start).

## Run it

```bash
npm install
npm run dev
```

[http://localhost:3000]()

## Wordpress Side

Install wpe-headless plugin.

- Add Menu types - Authenticated, Unauthenticated
  wp-admin/options-general.php
  Ensure Membership Membership Anyone can register

Add something like the following to

```php
<?php
/**
 * Welcome Email
 */
add_filter('wp_new_user_notification_email', brs_new_user_notification_email, 10, 3);

function brs_new_user_notification_email($wp_new_user_notification_email, $user, $blogname) {

 	$message = $wp_new_user_notification_email['message'];
    $message = str_replace( site_url().'/wp-admin/',wpe_headless_get_setting("frontend_uri") '/set-password/', $message );
	$wp_new_user_notification_email['message'] = $message;

//	$wp_new_user_notification_email['headers'] = array('Content-Type: text/html; charset=UTF-8');

    return $wp_new_user_notification_email;
}
```

## Functionality

- Log in
- Log out
- New user sign-ups
- Sets new password
- Password resets
- Menu According to if you are logged in or not
- A “Members” page with gated content that only authenticated users can access
- A useAuth() custom hook that provides the user’s loggedIn status and user details to the rest of the app via React context. [Created by faustjs]
- Helper components to limit certain content to only authenticated/unauthenticated users.
- User profile page

## Todo

- A “Create Post” page where users with the publish_posts capability can create new posts, but other users can’t.

## Bugs

### Sign up Page

- The Error message is not displayed correctly on duplicate emails
- The Sign up requires two button presses - it should be one.

### set-password page

- Mutation works but the feedback is incorrect. No error handling, and when the password is reset the component is not updated accordingly.

### Forgot password Page

- There is no user registered with that email address. Error Feedback not shown.
- Success Feedback is not shown.

n GQty, the data selection usually needs to be called to be included in the GraphQL query, you've likely seen this. This is the same case here. One of the solutions you could do is to return the fields that you intend on using in your UI, this will guarantee the data selections get called, and are updated correctly.
Take for example the code you pasted in chat. if you were to return the fields you intend on using/mutation in the mutation, this should work as you intend:
const { id, firstName, lastName } = client?.auth?.useQuery()?.viewer;
const [updateUser, { data, isLoading, error }] = client.auth.useMutation(
(mutation, { id, firstName, lastName }: UpdateUserInput) => {
const {user} = mutation.updateUser({
input: {
id,
firstName,
lastName,
},
});

      if(user) {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }
    },
    {
      refetchQueries: [
        client?.auth?.useQuery()?.viewer,
      ],
      awaitRefetchQueries: false,
      // suspense: false,
    }

);

And here is a full working example that you can paste directly into a page for testing purposes:
import { client, UpdateUserInput } from 'client';

export default function Page() {
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
    },

);

if (isAuthLoading) {
return <div>Loading...</div>;
}

if (!isAuthenticated) {
return <div>Not authenticated</div>;
}

return (
<>

<div>First name: {viewer?.firstName}</div>
<div>Last name: {viewer?.lastName}</div>
<div>Email: {viewer?.email}</div>

      <div>
        <button
          onClick={() =>
            updateUser({
              args: { id: viewer?.id, firstName: 'John', lastName: 'Doe' },
            })
          }
        >
          Update user
        </button>
      </div>
    </>

);
}
I
