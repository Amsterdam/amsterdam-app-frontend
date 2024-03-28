# iOS Privacy

Apple offers a number of APIs, which is what they call features of the operation system that can be used/accessed by the app. Usage of these features has to be declared in the "privacy manifest": `./ios/PrivacyInfo.xcprivacy`.

Packages should declare this themselves; in other words: we should not have to do this, unless we write custom native code using these APIs. But in case of an issue with a package, we can solve it by adding the declaration ourselves.

The file contains key-value pairs of:

- `NSPrivacyAccessedAPIType`: the name of the API, e.g. `NSPrivacyAccessedAPICategoryFileTimestamp`
- `NSPrivacyAccessedAPITypeReasons`: array of codes which describe the way the API is used

See [the docs](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api) for all types, codes and their descriptions.

## Current set up

### NSPrivacyAccessedAPICategoryFileTimestamp

#### C617.1

> Declare this reason to access the timestamps, size, or other metadata of files inside the app container, app group container, or the app’s CloudKit container.

#### 3B52.1

> Declare this reason to access the timestamps, size, or other metadata of files or directories that the user specifically granted access to, such as using a document picker view controller.

### NSPrivacyAccessedAPIType=NSPrivacyAccessedAPICategoryDiskSpace

#### 7D9E.1

> Declare this reason to include disk space information in an optional bug report that the person using the device chooses to submit. The disk space information must be prominently displayed to the person as part of the report.
>
> Information accessed for this reason, or any derived information, may be sent off-device only after the user affirmatively chooses to submit the specific bug report including disk space information, and only for the purpose of investigating or responding to the bug report.

### NSPrivacyAccessedAPICategorySystemBootTime

#### 3D61.1

> Declare this reason to include system boot time information in an optional bug report that the person using the device chooses to submit. The system boot time information must be prominently displayed to the person as part of the report.
>
> Information accessed for this reason, or any derived information, may be sent off-device only after the user affirmatively chooses to submit the specific bug report including system boot time information, and only for the purpose of investigating or responding to the bug report.

### NSPrivacyAccessedAPICategoryUserDefaults

#### CA92.1

> Declare this reason to access user defaults to read and write information that is only accessible to the app itself.
>
> This reason does not permit reading information that was written by other apps or the system, or writing information that can be accessed by other apps.