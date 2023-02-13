/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/DevDebug-iphonesimulator/Amsterdam test.app',
      build:
        'xcodebuild -workspace ios/AmsterdamApp.xcworkspace -scheme "AmsterdamApp Test" -configuration DevDebug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/Amsterdam.app',
      build:
        'xcodebuild -workspace ios/AmsterdamApp.xcworkspace -scheme AmsterdamApp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.dev.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/dev/debug/app-dev-debug.apk',
      build:
        'cd android && bash ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
      reversePorts: [8081],
    },
    'android.prod.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/prod/debug/app-prod-debug.apk',
      testBinaryPath:
        'android/app/build/outputs/apk/androidTest/prod/debug/app-prod-debug-androidTest.apk',
      build:
        'cd android && bash ./gradlew assembleProdDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
      reversePorts: [8081],
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/prod/debug/app-prod-debug.apk',
      build:
        'cd android && bash ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14 Pro',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel3atest',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.dev.debug',
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.dev.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.dev.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.dev.release',
    },
  },
}
