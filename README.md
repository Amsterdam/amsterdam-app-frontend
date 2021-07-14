# Amsterdam App

## About

The goal for this project is to create a general native app for Amsterdam citizens
to get information and interact with the municipality –
much a native alternative to the web presences of amsterdam.nl and Mijn Amsterdam.

## Installation

The React Native docs offer a good overview of how to set up your development environment:
https://reactnative.dev/docs/environment-setup

- Clone repo: `git clone git@ssh.dev.azure.com:v3/CloudCompetenceCenter/Amsterdam-App/Amsterdam-App amsterdam-app`
- Install XCode dependencies: `cd amsterdam-app && pod install && cd ..`
- Install Node dependencies: `npm i`
- Start [Metro](https://facebook.github.io/metro/), the JavaScript bundler for React Native: `npm start`
- Start the iOS-phone emulator: `npm run ios:phone`
- Start the iOS-tablet emulator: `npm run ios:tablet`
- Start the Android-phone emulator: `npm run android:phone`
- Start the Android-tablet emulator: `npm run android:phone`
    - Make sure to add @Pixel_C_API_30 to your devices in Android Studio's AVD Manager

We recommend installing this [React Native debugger](https://github.com/jhen0409/react-native-debugger) additionally:
`brew install --cask react-native-debugger`

## Publish app to test-stores

### Android
- Add your account to Gemeente Amsterdam developer account. To get access, send an e-mail to: webteamcommunicatiebureau@amsterdam.nl
- Go to Google play console, login and verify that you have access to this app
- Click on the app, now on the left you see "Internal test", click on it
- Click the button "Create new release" in the upper-right. Follow the instructions to sign the app and once done, upload your signed app-bundle
- Add release-notes to the textarea at the bottom
- Click "Save" and continue to "review and publish"
- In the tab "Testers" you can select your testers and on the bottom you can copy the link of the test-app in the Play Store. E-mail your testers and paste this code in the e-mail. With this link they can download the app in the Play Store.

### iOS
- In Xcode, Change the version in the General tab of your target
- Make an archive of the app: Product -> Archive
- Go to Window -> Organiser and select your archive. Click "Distribute App"
- Choose "App store connect", then "upload"
- Select all distribution options and after that: "automatically manage signing"
- Upload
- Choose "no"
- The app is getting prepared and all the testers get an e-mail about the new release which they can download in Testflight

