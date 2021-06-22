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
