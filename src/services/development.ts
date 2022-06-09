import BuildConfig from 'react-native-build-config'

export const isDevApp = BuildConfig?.BUILD_VARIANT === 'dev'

enum AppFlavour {
  production = 'production',
  development = 'development',
}

export const appFlavour = isDevApp
  ? AppFlavour.development
  : AppFlavour.production

export const devLog = (...args: unknown[]) => {
  if (isDevApp) {
    console.log(args)
  }
}
