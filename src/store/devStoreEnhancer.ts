import type {ConfigureStoreOptions, StoreEnhancer} from '@reduxjs/toolkit'

export const devStoreEnhancer: ConfigureStoreOptions['enhancers'] =
  enhancers => {
    if (__DEV__) {
      const devToolsEnhancer = (
        require('redux-devtools-expo-dev-plugin') as {
          default: (options: unknown) => StoreEnhancer
        }
      ).default
      const {polyfillGlobal} =
        require('react-native/Libraries/Utilities/PolyfillFunctions') as {
          polyfillGlobal: (name: string, fn: () => unknown) => void
        }

      const {TextEncoder, TextDecoder} = require('text-encoding') as {
        TextDecoder: unknown
        TextEncoder: unknown
      }

      polyfillGlobal('TextEncoder', () => TextEncoder)
      polyfillGlobal('TextDecoder', () => TextDecoder)

      return enhancers.concat(devToolsEnhancer({}))
    }

    return enhancers
  }
