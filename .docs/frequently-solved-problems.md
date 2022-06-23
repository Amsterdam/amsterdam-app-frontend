# Frequently solved problems

Here we document useful tips and solutions to (relatively) common problems with building the app.

## react-native start fails

Sometimes building the JS fails due to caching issues, for example after changes in the import aliases or the babel config. If the issue is unclear a good place to start is to clear all relevant caches:

- `$ npm cache clear -f` (clear npm cache)
- `$ watchman watch-del-all` (clear watchman cache)
- `$ npx react-native start --reset-cache` (clear metro cache and start RN)

## Android or iOS build fails

When faced with an unclear error during the native build, some options are:

- Remove `package-lock.json` and `/node_modules`
- Run `npm i`

### iOS specific

- Remove `ios/Pods` and `Podfile.lock`
- In `/ios`:
  - `bundle update` (update Ruby gems, including Cocoapods)
  - `pod install --repo-update` (install Pods and force downloading the latest versions of the repos)

Occasionally a build fails because of outdated data in the build folder. When building with XCode, there is an option to clear the build folder: CMND+SHIFT+K. Alternatively, you can usually find the path to the build folder in the build/error logs and manually delete the folder.

## Sentry pod issue

Installing the Sentry pod may result in an invalid syntax in `project.pbxproject` which will cause the build to fail on an unclear error.

```
SyntaxError: Expected "{" [...] but ";" found
```

The solution is to rewrite this:

```
{
  value = D76C6CCC2729820200E1460A;
  comment = ;
},
```

To this:

```
  D76C6CCC2729820200E1460A,
```