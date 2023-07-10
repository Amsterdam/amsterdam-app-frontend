# Code signing for ios

## Update expired certificates/profiles

### 1. Create new certificates and profiles in the App Store

Run the pipeline `Amsterdam-App-Frontend [sync]` to run Fastlane Match.

#### Possible issues

- If you see that a profile is listed with a number `match AppStore nl.amsterdam.app.dev 123456789`, delete `match AppStore nl.amsterdam.app` and `match AppStore nl.amsterdam.app.dev` (https://developer.apple.com/account/resources/profiles/list) and run again.
- If you get an error that a certificate cannot be created, delete certificates for user `API Key: 21d7[...]c95f` (https://developer.apple.com/account/resources/certificates/list)
- If you want to force match to renew, you can delete the branch: https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_git/Amsterdam-App-Frontend-iOS-Certificates?version=GBamsterdam-app

### 2. Set the provisioning profiles in the poject

After running the sync pipeline, run Fastlane Match locally:

```shell
$ cd ios
$ bundle exec fastlane ios syncAll readonly:true
```

Then add the profiles to the Xcode project:
- Open the workspace in Xcode
- Go to project AmsterdamApp and select target AmsterdamApp
- Go to tab Signing & Capabilities
- Set the 4 provisioning profiles:
    - Debug: `match Development nl.amsterdam.app`
    - DevDebug: `match Development nl.amsterdam.app.dev`
    - Release: `match AppStore nl.amsterdam.app`
    - DevRelease: `match AppStore nl.amsterdam.app.dev`
