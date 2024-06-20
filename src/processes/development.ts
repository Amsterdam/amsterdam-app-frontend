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
export const isLocalApp = appFlavour === AppFlavour.local

export const devInfo = (...args: unknown[]) => {
  if (isLocalApp) {
    // eslint-disable-next-line no-console
    console.info(...args)
  }
}

export const devLog = (...args: unknown[]) => {
  if (isLocalApp) {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}

export const devError = (...args: unknown[]) => {
  if (isLocalApp) {
    // eslint-disable-next-line no-console
    console.error(...args)
  }
}
