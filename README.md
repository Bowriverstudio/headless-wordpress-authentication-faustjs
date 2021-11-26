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

wp-admin/options-general.php
Ensure Membership Membership Anyone can register

## Functionality

- Log in
- Log out
- New user sign-ups

## In Progress

- Password resets
- User profile page
- A “Members” page with gated content that only authenticated users can access
- A “Create Post” page where users with the publish_posts capability can create new posts, but other users can’t.
- A useAuth() custom hook that provides the user’s loggedIn status and user details to the rest of the app via React context.
- Helper components to limit certain content to only authenticated/unauthenticated users.

## Bugs

### Sign up Page

- The Error message is not displayed correctly on duplicate emails
- The Sign up requires two button presses - it should be one.
