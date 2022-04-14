# Amsterdam App

We’re creating a native app for citizens, entrepreneurs, and visitors of the City of Amsterdam to provide information, allow communication, and streamline transactions.

## Installation

The [React Native docs](https://reactnative.dev/docs/environment-setup) offer a good overview of how to set up your development environment. To summarize:

- Clone the repository 
  - from Azure: `git clone git@ssh.dev.azure.com:v3/CloudCompetenceCenter/Amsterdam-App/Amsterdam-App amsterdam-app-frontend`
  - or from GitHub: `git clone git@github.com:Amsterdam/amsterdam-app-frontend.git`.
- Install Node dependencies: `npm i`.
- Install XCode dependencies: `cd amsterdam-app-frontend && pod install && cd ..`.
- Start [Metro](https://facebook.github.io/metro/), the JavaScript bundler for React Native: `npm start`. Or, more
  specifically:
    - Start the iOS phone emulator: `npm run ios:phone`.
    - Start the iOS tablet emulator: `npm run ios:tablet`.
    - Start the Android phone emulator: `npm run android:phone`.
    - Start the Android tablet emulator: `npm run android:phone`.
      - Make sure to add @Pixel_C_API_30 to your devices in Android Studio's AVD Manager.
- We recommend installing the [React Native debugger](https://github.com/jhen0409/react-native-debugger)
  - For Mac via Homebrew: `brew install --cask react-native-debugger`.

### Secret files

Secret files included are:
- android/app/google-services.json

### Environment variables

We currently use two environment variables to authorise project managers to send push notifications:

- AUTH_PASSWORD
- AUTH_SHARED_SECRET

Ask one of the developers to provide their values and store these in a file called `/.env`.

## Release automation

A continuous integration & deployment pipeline using Azure DevOps and [Fastlane](https://fastlane.tools/) is included.

### Azure DevOps

The configuration of the pipeline is in `azure-pipelines.yml`.
From here we run Fastlane for iOS and for Android.
The pipeline has access to the secure files in the Azure Library, which can be accessed from the Azure DevOps dashboard.

### Fastlane

Fastlane handles most importantly building, signing and releasing our app.
We do this for iOS and Android separately.
Both directories have a `fastlane` directory.
Most importantly here is the Fastfile.
It encompasses a pipeline that works with consecutive Fastlane actions.
Sometimes they use environment variables or files, set up in thee Azure pipeline.

#### Release notes

Right now, it is only possible to add release notes manually.

#### Version name

Manually change version-name (iOS and Android) if you need to.

**[Pipeline configuration](README-build.md)**


## Manual releases

Follow the steps below to release a new version of the app into the (test) stores.

### Android

- Add your account to Gemeente Amsterdam’s developer account.
  To get access, send an e-mail to
  the [web team](mailto:webteamcommunicatiebureau@amsterdam.nl).
- Go to the [Google Play console](https://play.google.com/console/), log in, and verify that you have access to this app.
- Click on the app, then on “Internal test” on the left.
- Click the button "Create new release" in the upper right.
  Follow the instructions to sign the app and, once done, upload your signed app bundle.
- Add release notes into the text area at the bottom.
- Click “Save” and continue to "Review and publish".
- Select your test audience in the tab "Testers" testers.
  At the bottom, copy the link of the test app in the Play Store
  Include the link in an e-mail to your testers to allow downloading the new version of the app.

### iOS

- In XCode, change the version in the “General” tab of your target.
- Under the “Signing & Capabilities” tab, change “Bundle identifier for Signing (Release)” to:
  `org.reactjs.native.undefined.StadsApp`.
- Make sure the Build configuration is "Release" (Menu: Product > Scheme > Edit scheme)
- Make a backup of the app: Product -> Archive.
- Go to Window -> Organiser and select your archive.
  Click "Distribute App".
- Choose "App store connect", then "Upload".
- Select all distribution options and after that: "Automatically manage signing".
- Upload.
- Choose "No".
- The app is getting prepared.
  All the testers will receive an e-mail about the new release which they can download in TestFlight.
- Afterwards, turn the build configuration back to "Debug" for further development.

#### Two types of test releases

We have internal releases for the product team, and external ones for the stakeholders.
The version of the Scrum-team release has a digit extra, so 4 in total.

#### Product team

- These are testreleases solely for the Scrum-team.
- Build number gets incremented each time a new release is done
- Version number is 0.\[sprint\]

#### Stakeholders

- Version number is 0.\[sprint\]
- Once uploaded to App Store connect, go to Testflight and add the group "Stadsapp-stakholders"

## Git
We work according to [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Release

- Branch from develop and call it release/\[version-number\].
- Once reviewed, pull branch into main and tag it with its version number.

## Push notifications

To test push notifications locally, do the following:

1. Log into Chrome with the Team Communicare account
2. Go to https://developers.google.com/oauthplayground/
3. Fill in for scope: `https://www.googleapis.com/auth/firebase.messaging`
4. Select Team Communicare account
5. Click button ‘Exchange authorization code for tokens’ and get the `access_token`
6. Open your Postman app
7. Set header: `Authorization: Bearer /[access_token/]`
8. Enter body of this signature, where `token` is the Firebase token of your device (see code):

```
{
  "message": {
    "token": "alovelyfcmtoken",
    "data": {
      "linkSourceid": "f296eba1-189f-477e-8302-44ffc369f032",
      "type": "WarningCreatedByProjectManager"
    },
    "notification": {
      "body": "Er is nieuws over een project!",
      "title": "Nieuws-update Bullebak"
    }
  }
}
```

## Deep links

These are links from outside the app that will open the app and trigger something:

- Authorizing project managers: amsterdam://omgevingsmanager/home/:id (id is generated by our backend).

## Keep your code secure

We use `detect-secrets` to scan the codebase for secrets.
This results in a .secrets.baseline file in the root of the project:

- https://github.com/Yelp/detect-secrets

## Tips and tricks

1. To see what's in the async store, type `showAsyncStorageContentInDev()` in the React Native Debugger console.
