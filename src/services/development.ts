import BuildConfig from 'react-native-build-config'

export const isDevApp = BuildConfig?.BUILD_VARIANT === 'dev'

export const devLog = (...args: unknown[]) => {
  if (isDevApp) {
    console.log(args)
  }
}
