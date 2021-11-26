# Next.js Headless Wordpress Authentication Faustjs Example

This POC is the faustjs sample, with Authentication added like kellenmace [headless-wordpress-authentication-native-cookies-gatsby](https://github.com/kellenmace/headless-wordpress-authentication-native-cookies-gatsby) project.

[headless-wordpress-authentication-native-cookies](https://developers.wpengine.com/blog/headless-wordpress-authentication-native-cookies)

[faustjs - guides - auth](https://faustjs.org/docs/next/guides/auth)

## Setup

Follow the steps here: [Faustjs Quick Start](https://github.com/wpengine/faustjs#quick-start).

## Run it

```bash
npm install
npm run dev
```

[http://localhost:3000]()

## Functionality

- Log in
- Log out

## In Progress

- New user sign-ups
- Password resets
- User profile page
- A “Members” page with gated content that only authenticated users can access
- A “Create Post” page where users with the publish_posts capability can create new posts, but other users can’t.
- A useAuth() custom hook that provides the user’s loggedIn status and user details to the rest of the app via React context.
- Helper components to limit certain content to only authenticated/unauthenticated users.
