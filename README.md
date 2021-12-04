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
