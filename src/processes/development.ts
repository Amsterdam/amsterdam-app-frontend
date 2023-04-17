import BuildConfig from 'react-native-build-config'

export const isDevApp = BuildConfig?.BUILD_VARIANT === 'dev'

export enum AppFlavour {
  development = 'development',
  local = 'local',
  production = 'production',
}

export const appFlavour =
  AppFlavour[__DEV__ ? 'local' : isDevApp ? 'development' : 'production']

export const isProductionApp = appFlavour === AppFlavour.production

export const devLog = (...args: unknown[]) => {
  if (isDevApp) {
    console.log(args)
  }
}
