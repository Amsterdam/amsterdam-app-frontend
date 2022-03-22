# Amsterdam App

We’re creating a native app for Amsterdam citizens to receive information and interact with the municipality – much an
alternative to the web presences of [amsterdam.nl](https://www.amsterdam/nl)
and [Mijn Amsterdam](https://mijn.amsterdam.nl).

***
## Installation

The [React Native docs](https://reactnative.dev/docs/environment-setup) offer a good overview of how to set up your
development environment. To summarize:

- Clone repo: `git clone git@ssh.dev.azure.com:v3/CloudCompetenceCenter/Amsterdam-App/Amsterdam-App amsterdam-app`.
- Install Node dependencies: `npm i`.
- Install XCode dependencies: `cd amsterdam-app && pod install && cd ..`.
- Start [Metro](https://facebook.github.io/metro/), the JavaScript bundler for React Native: `npm start`. Or, more
  specifically:
    - Start the iOS-phone emulator: `npm run ios:phone`.
    - Start the iOS-tablet emulator: `npm run ios:tablet`.
    - Start the Android-phone emulator: `npm run android:phone`.
    - Start the Android-tablet emulator: `npm run android:phone`.
        - Make sure to add @Pixel_C_API_30 to your devices in Android Studio's AVD Manager
- We recommend installing this [React Native debugger](https://github.com/jhen0409/react-native-debugger) additionally:
  `brew install --cask react-native-debugger`.

### Secret files
Secret files included are:
- android/app/google-services.json

### Environment Variables
Currently, we use these environment variables. Store these in a file called '.env' and save in the root of the React Native codebase. Ask one of the developers to acquire them.
- AUTH_PASSWORD
- AUTH_SHARED_SECRET
***
## Release automation (CI/CD)

With Azure DevOps and [Fastlane](https://fastlane.tools/) we created a CI/CD pipeline.

### Azure DevOps
The configuration of the pipeline is in azure-pipelines.yml. From here we run fastlane for iOS and for Android. The pipeline has access to the secure files in the Azure Library, which can be accessed from the Azure DevOps dashboard.

### Fastlane
Fastlane handles most importantly building, signing and releasing our app. We do this for iOS and Android separately. Both folders have a fastlane folder. Most importantly here is the Fastfile. It encompasses a pipeline that work with consecutive fastlane-actions. Sometimes they use environment variables or files, set up in de Azure pipeline.
#### **Release-notes**
Right now, it is only possible to add release-notes manually.

#### **Version-name**
Manually change version-name (iOS and Android) if you need to

**[Configuration of the pipeline](README-build.md)**

***
## Release manually

Follow the steps below to release a new version of the app into the (test) stores.

### Android

- Add your account to Gemeente Amsterdam’s developer account. To get access, send an e-mail to
  the [web team](mailto:webteamcommunicatiebureau@amsterdam.nl).
- Go to the [Google Play console](https://play.google.com/console/), log in, and verify that you have access to this
  app.
- Click on the app, then on “Internal test” on the left.
- Click the button "Create new release" in the upper-right. Follow the instructions to sign the app and, once done,
  upload your signed app bundle.
- Add release notes to the textarea at the bottom.
- Click “Save” and continue to "Review and publish".
- Select your test audience in the tab "Testers" testers. At the bottom, copy the link of the test app in the Play
  Store, and include it in an e-mail to your testers to allow downloading the new version of the app.

### iOS

- In Xcode, change the version in the “General” tab of your target.
- In the “Signing & Capabilities” tab, change “Bundle identifier for Signing (Release)” to:
  `org.reactjs.native.undefined.StadsApp`.
- Make sure the Build configuration is "Release" (Menu: Product > Scheme > Edit scheme)
- Make a backup of the app: Product -> Archive.
- Go to Window -> Organiser and select your archive. Click "Distribute App".
- Choose "App store connect", then "Upload".
- Select all distribution options and after that: "Automatically manage signing".
- Upload.
- Choose "No".
- The app is getting prepared. All the testers will receive an e-mail about the new release which they can download in
  TestFlight.
- Afterwards, turn the build configuration back to "Debug" for further development.

#### **2 types of testrelease:**
There are 2 types of testreleases. One for the Scrum-team for development and testing purposes and one for the stakeholders. The version of the Scrum-team release has a digit extra, so 4 in total.

#### Stakeholders
- Version number is 0.\[sprint\]
- Once uploaded to App Store connect, go to Testflight and add the group "Stadsapp-stakholders"

#### Scrum-team
- These are testreleases solely for the Scrum-team.
- Build number gets incremented each time a new release is done
- Version number is 0.\[sprint\]
------------------------------------------

## Git
We work according to [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Release
- Branch from develop and call it release/\[version-number\]
- Once reviewed, pull branch into main and tag it with its version-number

------------------------------------------

## Deep-links
Deep links are links from outside the app that will open the app and trigger something
- giving managers access: amsterdam://omgevingsmanager/home/:id (id is generated by our backend)

-------------------------------------------
## Keep your code secure
We use detect-secrets to scan the codebase for secrets. This results in a .secrets.baseline file in the root of the project:
- https://github.com/Yelp/detect-secrets

-------------------------------------------
## Tips and tricks

1. To see what's in the async store, type `showAsyncStorageContentInDev()` in the React Native Debugger console.
