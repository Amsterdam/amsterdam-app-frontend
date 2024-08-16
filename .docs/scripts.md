# Script commands

### Overview

Here’s a brief description of each command in the scripts list of package.json:

1. **`android:connect:device`:** Connects an Android device to the development server by forwarding ports 8081 and 8000 using `adb`.
2. **`android:phone:dev`:** Runs the Android app in development mode (`devDebug`) with a specific app ID suffix (`dev`).
3. **`android:phone:prod`:** Runs the Android app in production debug mode (`prodDebug`).
4. **`android:tablet`:** Launches an Android emulator (`Pixel_C_API_30`) and runs the app in development mode on the emulator with the `dev` app ID suffix.
5. **`android:deeplink:construction-work-editor`:** Opens the Android app with a deep link to the `construction-work-editor` screen using `adb shell`.
6. **`clean`:** Cleans the React Native project to remove build artifacts and reset project-related files.
7. **`format`:** Checks the code formatting using `prettier`.
8. **`format:fix`:** Formats the code by applying `prettier` rules.
9. **`ios:install:pods`:** Installs iOS dependencies (CocoaPods) and updates the repository.
10. **`ios:update:pods`:** Updates iOS dependencies (CocoaPods) to the latest versions and updates the repository.
11. **`ios:phone:dev`:** Runs the iOS app on a connected device in development mode (`DevDebug`) using the `AmsterdamApp Test` scheme.
12. **`ios:phone:simulator:dev`:** Runs the iOS app in development mode on an iPhone SE simulator using the `AmsterdamApp Test` scheme.
13. **`ios:phone:prod`:** Runs the iOS app in production debug mode using the `AmsterdamApp` scheme.
14. **`lint`:** Runs ESLint to check for linting issues in JavaScript, TypeScript, and JSON files.
15. **`lint:fix`:** Runs ESLint to automatically fix linting issues in JavaScript, TypeScript, and JSON files.
16. **`postinstall`:** Applies patches to dependencies after installation using `patch-package`.
17. **`prepare`:** Prepares the environment for `husky` by setting up Git hooks.
18. **`redux:devtools`:** Starts Redux DevTools on port 8000 and opens it in the browser.
19. **`start`:** Starts the React Native development server.
20. **`start:reset:cache`:** Starts the React Native development server and resets the Metro bundler cache.
21. **`storybook`:** Starts the Storybook development server on port 7007 for UI component testing.
22. **`storybook:build`:** Builds Storybook for production use.
23. **`test`:** Runs unit tests using Jest.
24. **`test-ci`:** Runs unit tests in continuous integration (CI) mode with coverage reports using Jest.
25. **`test:bundle`:** Bundles the React Native app in development mode and then removes the generated bundle file.
26. **`typescript`:** Compiles TypeScript files using the TypeScript compiler (`tsc`).

### Context

**Gems**

- Gems are packages or libraries for Ruby, which is a programming language. Gems are managed using Ruby's package manager, Bundler, and installed from RubyGems, a central repository for Ruby libraries.

- Gems are primarily used for managing iOS-specific dependencies. In our case this is CocoaPods, which is used to manage iOS dependencies and Fastlane, our tool to automatically build and distribute app versions, which is built on Ruby.

- `Gemfile` and `Gemfile.lock` are the files where you define and lock versions of gems. Typically, you might use bundle exec to run commands that involve gems (e.g., bundle exec pod install).

**Pods**

- Pods are packages or libraries used in iOS development, managed by CocoaPods, a dependency manager for Swift and Objective-C projects. Pods can include things like third-party libraries, frameworks, or native code that our app depends on.

- If an npm package includes native iOS code (e.g., camera or location access), it will be linked through CocoaPods as a pod. This allows the native iOS code from the npm package to be properly integrated and compiled within the iOS project.

- `Podfile` and `Podfile.lock` are the files where versions of gems are defined and locked. Typically, you might use bundle exec to run commands that involve gems (e.g., bundle exec pod install).

**Metro Bundler**

Metro Bundler is the JavaScript bundler used by React Native. It takes all the JavaScript code in a React Native project and bundles it into a single file (or small set of files) that the app can execute. Metro optimizes the code for performance and is designed to handle the unique requirements of mobile development, such as fast refresh during development and efficient packaging for production.
