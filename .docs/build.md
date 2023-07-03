# Builds and releases

A continuous integration & deployment pipeline using Azure DevOps and [Fastlane](https://fastlane.tools/) is included.

- [Azure DevOps Library](#library)
- [Azure DevOps Pipelines](#pipelines)
- [Fastlane](#fastlane)


## <a id="library"></a>Azure DevOps Library

Azure DevOps Pipelines has a library where our secrets are stored. This consists of variables and secure files. When testing on local machines, these have to exist there as well.

### Variables

- `P12_PASSWORD`: password to decrypt the Apple developer certificate; used in the pipelines
- `KEYSTORE_PASSWORD`: used in the pipelines: password to decrypt the Android upload key; used by Fastlane
- `AUTH_PASSWORD`: authorise project managers to send push notifications; used in the app as env var
- `AUTH_SHARED_SECRET`: authorise project managers to send push notifications; used in the app as env var
- `PIWIK_PRO_URL`, `PIWIK_PRO_URL_ACCEPT`: Piwik Pro API URL for production or accept
- `PIWIK_PRO_ID`, `PIWIK_PRO_ID_ACCEPT`: Piwik Pro site ID for production or accept


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
- `storybook-github-ssh`: SSH key to release the Storybook build to GitHub pages

## <a id="pipelines"></a>Azure DevOps Pipelines

### Builds

The configuration of the build pipelines (YAML) is in `/pipelines`. These YAML files contain the instructions for DevOps.

The pipelines have access to the secure files in the Azure Library, which can be accessed from the Azure DevOps dashboard. In the pipelines we run Fastlane to create the iOS and Android builds.

- **Amsterdam-App-Frontend [build]**: the main app build pipeline
- **Amsterdam-App-Frontend [publish]**: runs jobs not directly related to the app builds:
  - build StoryBook
  - [publish source code to GitHub](./push-code-to-github.md)
- **Amsterdam-App-Frontend [validate]**: runs linting, TypeScript (tsc) and unit tests

The first two are triggered simultaneously by a commit to main, the last one is triggered by opening or updating a PR.

A short overview of the app build process in the Amsterdam-App-Frontend pipeline. The pipeline will:

- retrieve all neccessary secure files and credentials
- set up the environment required to build the apps
- start a Fastlane lane to build the apps: a production and a test version for both iOS and Android
- set env vars for the app front end code
- create a txt file with the version and build number
- publish all created artifacts (AABs, IPAs and version.txt) in a folder

#### Notes/gotchas

- *Specifying an exact version is not recommended on Microsoft-Hosted agents*: Amsterdam-App-Frontend builds will show this warning due to the pinned Ruby version. We can safely ignore these warnings: the version is pinned intentionally to match our local development environment. This will prevent potential version mismatch warnings/errors with the version in the lock file.

### Releases

A completed, successful run will trigger a release, which will use Fastlane to distribute the apps to the stores.

The configuration of the release pipelines is done in the DevOps interface, not via YAML files. In the releases the App Store and Play store API keys (secure files) are used. Note that the env vars VERSION_NUMBER and ARTIFACT_FOLDER, to be used by Fastlane, are set in the "Fastlane distribute" step.

## <a id="fastlane"></a>Fastlane

Fastlane handles building, signing and releasing our app. Fastlane "lanes" are triggered by the build pipelines and can be run locally too (provided you have the necessary files and set the env vars).

In the `/ios` and `/android` folders you can find a `fastlane` folder. This contains:
- `Appfile`: config for Fastlane
- `Fastfile`: the definitons of the lanes
- `.env.example`: rename to `.env` to set the env vars locally

You can find more documentation in these files.

### Installation

If you have the project up and running via the instructions in the main README, Fastlane should be installed already. It is installed as a Ruby gem, using bundler.