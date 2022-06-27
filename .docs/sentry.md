# Sentry

## Usage

### `useSentry` hook

The `useSentry` hook returns the functions `captureSentryBreadcrumb` and `sendSentryErrorLog`.

- `captureSentryBreadcrumb`: add an item to the breadcrumb trail. This contains a history of user interactions, requests etc. to which we can add custom "crumbs" using this function (the name of which is defined in the `BreadcrumbCategory` enum).
- `sendSentryErrorLog`: log an error manually; to be used in (e.g.) catch statements.

### ErrorBoundary

To be used to catch errors thrown in the wrapped components. See https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/

2 ErrorBoundaries are implemented in `App.tsx` to catch errors that are not handled by a "deeper" boundary. `CustomErrorBoundary.tsx` is to be used outside the Redux RootProvider only and contains unthemed styles as a necessity (the theme is not available outside the RootProvider).

#### Caveats

Note that ErrorBoundaries will not catch exceptions thrown in event handlers! This means that, when a handler (e.g. in an onPress prop) is liable to throw an error, you are required to handle it in the function passed to the handler.

## Config

To connect Sentry to a different account:
- Replace the content of `sentry.properties`
  - `defaults.url`: the URL of the server; will be `https://sentry.io/` if we're using Sentry SaaS or the domain name in the case of a "self hosted" solution
  - `defaults.org`: Sentry organistation slug, can be found in the Sentry interface
  - `defaults.project`: Sentry project name, can be found in the Sentry interface
  - `auth.token`: can be generated in the Sentry interface, under Settings > Account > API > Auth Tokens
- Set the correct DSN in `services/sentry.ts`: can be found under the project > Client Keys

## Consent

Current implementation is "consent ready". This means that when we implement a consent mechanism, which allows users to (dis-) allow data sharing, we can enable or disable Sentry or Sentry features based on this setting. The consent setting is presumed to live in the Redux state. We can refer to the state in the Sentry hooks. Consent related data relevant to this is:

- Data sent with `captureSentryBreadcrumb` and `sendSentryErrorLog`.
- Default data sent with logs and breadcrumbs. This can be sanitized in `beforeBreadcrumb` and `beforeSend` in the init method (`services/sentry.ts`). For example, URL query params are already stripped from the `xhr` breadcrumbs as they may contain personal details.
- We set `getUniqueId` from `react-native-device-info` as the use ID, but can anonimize this via `setSentryUserData` (`services/sentry.ts`).

Note that the `useSentry` hooks has 2 parameters to optionally override the consent settings, which we can use *with care* to log errors before consent is initialised or to override the consent setting, only if we are sure we do not send any sensitive data.
