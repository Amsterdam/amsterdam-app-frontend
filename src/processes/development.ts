import BuildConfig from 'react-native-build-config'

export const isDevApp = BuildConfig?.BUILD_VARIANT === 'dev'

export enum AppFlavour {
  production = 'production',
  development = 'development',
  local = 'local',
}

export const appFlavour =
  AppFlavour[__DEV__ ? 'local' : isDevApp ? 'development' : 'production']

export const devLog = (...args: unknown[]) => {
  if (isDevApp) {
    console.log(args)
  }
}
