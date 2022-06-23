# Configuration of the pipeline

## Library

Azure DevOps Pipelines has a library where our secrets are stored. This consists of variables and secure files. When testing on local machines, these have to exist there as well.

### Variables
- `P12_PASSWORD`: password to decrypt the Apple developer certificate; used in the pipelines
- `KEYSTORE_PASSWORD`: used in the pipelines: password to decrypt the Android upload key; used by Fastlane
- `AUTH_PASSWORD`: authorise project managers to send push notifications; used in the app as env var
- `AUTH_SHARED_SECRET`: authorise project managers to send push notifications; used in the app as env var

### Secure files

#### iOS
- `AppleDeveloperCertificate.p12`: Apple Developer Certificate for signing
- `Amsterdamappprovisioningprofile.mobileprovision`: Provisioning profile for signing the production app
- `Amsterdamapptestprovisioningprofile.mobileprovision`: Provisioning profile for signing the test app
- `App_Store_Connect_API_Key_4B3KZ8N747.p8`: App Store Connect API key for connecting with App Store Connect API
- `GoogleService-Info.plist`: Firebase config and API key

#### Android
- `upload.keystore`: Google Play store upload key
- `google-services.json`: Firebase config and API key

#### Other/shared
- `sentry.properties`: Sentry config and API key (for both iOS and Android)
- `storybook-github-ssh`: SSH key to release the Storybokk build to GitHub pages

## Release automation

A continuous integration & deployment pipeline using Azure DevOps and [Fastlane](https://fastlane.tools/) is included.

### Azure DevOps

The configuration of the pipelines (YAML) is in `/pipelines`. The pipelines have access to the secure files in the Azure Library, which can be accessed from the Azure DevOps dashboard. In the pipelines we run Fastlane to create the iOS and Android builds.

- Amsterdam-App-Frontend: the main app build pipeline, also builds StoryBook
- Amsterdam-App-Frontend Tests: runs linting, TypeScript (tsc) and unit tests (triggered by opening or updating a PR)

A short overview of the app build process in the Amsterdam-App-Frontend pipeline. The pipeline will:

- retrieve all neccessary secure files and credentials
- set up the environment required to build the apps
- start a Fastlane lane to build the apps: a production and a test version for both iOS and Android
- set env vars for the app front end code
- create a txt file with the version and build number
- publish all created artifacts in a folder

A completed, successful run will trigger a release, which will use Fastlane to distribute the apps to the stores.

### Fastlane

Fastlane handles most importantly building, signing and releasing our app.
We do this for iOS and Android separately.
Both directories have a `fastlane` directory.
Most importantly here is the Fastfile.
It encompasses a pipeline that works with consecutive Fastlane actions.
Sometimes they use environment variables or files, set up in thee Azure pipeline.

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
- Approve the stage Distribute to Stakeholders in the release pipelines in Azure DevOps