# How to PIWIK

## Docs:

- https://github.com/PiwikPRO/react-native-piwik-pro-sdk#readme
- https://help.piwik.pro/

## A note on privacy

Anonymization is the feature that allows tracking a user’s activity for aggregated data analysis even if the user doesn’t consent to track the data. If a user does not agree to be tracked, he will not be identified as the same person across multiple sessions.

Personal data will not be tracked during the session (i.e. user ID, device ID). If the anonymization is enabled, a new visitor ID will be created each time the application starts.

Anonymization is enabled by default.

(See: https://github.com/PiwikPRO/react-native-piwik-pro-sdk?tab=readme-ov-file#data-anonymization)

## How to log

### Basic examples

A log will usually be triggered by an action and have a category and a name. With custom dimensions, additional data can be added to a log, which can be part of the event itself or can be conncted to the session.

```tsx
export const HomeButton = ({moduleName, onPress}: Props) => {
  const {trackCustomEvent} = usePiwik()
  const address = useAddress()

  const handlePress = useCallback(() => {
    // log the event with category and action
    trackCustomEvent(PiwikCategory.home, PiwikAction.buttonPress, {
      // add unique name
      name: `Navigate to ${moduleName}`,
      // optionally add predefined custom dimensions
      customDimensions: {
        [PiwikDimensions.hasAddress]: !!address.toString(),
      },
    })
    onPress()
  },
  [address, moduleName, trackCustomEvent])

  return <Button onPress={handlePress} />
}
```

### Methods

We usually log using a custom event: `trackCustomEvent` (https://github.com/PiwikPRO/react-native-piwik-pro-sdk?tab=readme-ov-file#tracking-custom-events)

There are some special logging options:
- `trackScreen`: screen views; this is integrated in the navigation
- `trackApplicationInstall`: is triggered the first launch of the app only
- `trackOutlink`: any linking to web or other apps - TODO
- `trackSearch`: track search queries - TODO
- `trackImpression`, `trackInteraction` (ads); `trackEcommerce`, `trackCampaign` (measure specific business/commerce/marketing objectives); `trackProfileAttributes` (profile a user accross platforms): commercial features, we probably won't use these
- `trackSocialInteraction`, `trackDownload`, `trackGoal`: not used at the moment, but could be useful

There are various other settings available. We use only `setIncludeDefaultCustomVariables` which adds platform version (device info), OS version and app version to logs.

### Category, action and name

Every custom event has a _category_ and an _action_. The _category_ we use to distinguish between modules, or we set it to 'general' if the data is not related to a module. The _action_ is whatever triggered the log, e.g. app coming to foreground or a button press.

See `src/types/piwik.ts` for the definitions of the categories and actions.

The name is the unique metric that you are logging, e.g. "the waste guide module has been enabled".

### Dimensions

What are dimensions? Dimensions are attributes of a log that describe specific characteristics. You can use them to add additional data to a log event.

There are broadly 2 types of information that you may want to log:
1. general information about the user, their preferences, profile or settings
2. something has happened (push notification received) or the user has done something (tapped a button)

For the 1st case (general information) we use a custom *session* dimension. This means that if the value changes during a session, the value will be updated.

> A session represents a set of user’s interactions with your app. By default, Analytics is closing the session after 30 minutes of inactivity, counting from the last recorded event in session and when the user will open up the app again the new session is started. You can configure the setSessionTimeout.

We log a bunch of session dimensions when the app comes to the foreground, but they can be added to other events too.

For the 2nd case we use custom dimensions (as opposed to custom *session* dimensions) to pass additional data.

#### Create dimensions

Dimensions have to be created in the interface first: https://dap.amsterdam.nl/analytics/#/9a752692-3faf-4677-8d36-08b01ce60cc4/settings/custom-dimensions/. Each dimension gets an integer index, to which we refer in our code. This index is shared between session and non-session dimensions, so 1 could be a session dimension, 2 could be a non-session dimension, etc.

Add the new dimension to `src/types/piwik.ts`.

## To do:
- `trackScreen`: use `SCREEN_TITLE_PARAM_KEY` param to set variable screen titles, so they can be logged
- allowList and privacy check
- define custom dimensions in Piwik
- define categories and actions
