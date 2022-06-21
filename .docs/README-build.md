# Configuration of the pipeline

## Library

Azure DevOps Pipelines has a library where our secrets are stored. This consists of variables and secure files. When testing on local machines, these have to exist there as well.

### Variables
- P12_PASSWORD: needed for installing our Apple certificate

### Secure files
#### **iOS:**
- Apple Developer Certificate for signing
- Provisioning profile for signing
- App Store Connect API key for connecting with App Store Connect API

#### **Android:**
- Google API JSON-key for connecting with Google Play API
- Keystore for signing APK

## iOS

### YAML
1. Install Certificate
2. Install Provisioning Profile
3. Install Cocoapods
4. Download App Store Connect API Key from Library and make accessible for Fastlane

### Fastlane
#### **lane: beta**
1. `increment_build_number`: increment build number
2. `app_store_connect_api_key`: make App Store Connect API key accessible for next step: get_certificates
3. `get_certificates`: connect with Azure's keychain and install certificate
4. `get_provisioning_profile`: get the provisioning profile from Azure
5. `xcversion`: use same Xcode version as locally
6. `build_app`: make a new app build
7. `upload_to_testflight`: upload the build to testflight

## Android

### YAML
1. Download Play Store API Key and make available for Fastlane
2. Download Keystore and make available for Fastlane

### Fastlane
#### **lane: bump_version_code**
Increase version code by 1

#### **lane: beta**
1. `gradle(task: 'clean')`: Delete the build directory
2. Create the APK and sign with keystore: 

    ```
      gradle(
        task: 'assemble',
        build_type: 'Release',
        properties: {     
          "android.injected.signing.store.file" => "upload-keystore",
          "android.injected.signing.store.password" => "Z706UwzJzN",     
          "android.injected.signing.key.alias" => "key0",
          "android.injected.signing.key.password" => "Z706UwzJzN"
      })
    ```
3. `upload_to_play_store`: Upload the package and release for the "interal"-track