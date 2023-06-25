import AsyncStorage from '@react-native-async-storage/async-storage'
import {createTransform, persistReducer} from 'redux-persist'
import {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'
import {AnyReducer, PersistedStateTransformer, ReduxConfig} from '@/store/types'

/**
 * Reduce an array of module configurations to an array of Redux slice configurations.
 */
export const getConfigs = <T extends CoreModuleConfig | ModuleClientConfig>(
  modules: T[],
): ReduxConfig[] =>
  modules.reduce((result: ReduxConfig[], {reduxConfig}: T) => {
    if (!reduxConfig) {
      return result
    }

    return [...result, ...reduxConfig]
  }, [])

/**
 * Is version A newer than version B, assuming an app version with or without build number, e.g. #.#.# or #.#.#.#
 */
export const isNewer = (versionA?: string, versionB?: string) => {
  if (!versionA || !versionB) {
    return false
  }
  return versionA > versionB
}

/**
 * Should the persisted state transformer be executed, based on the appVersion property, which is a function or a string.
 */
export const shouldTransform = (
  appVersion: ((oldVersion?: string | undefined) => boolean) | string,
  oldAppVersion?: string,
) => {
  if (!oldAppVersion) {
    return false
  }
  if (typeof appVersion === 'function') {
    return appVersion(oldAppVersion)
  }

  return oldAppVersion && !isNewer(appVersion, oldAppVersion)
}

/**
 * Create the transform for a slice, to handle backward compatibility for the Redux state.
 */
export const getStateTransform =
  (oldAppVersion?: string) =>
  <OldState, State>(
    key: string,
    persistedStateTransformers: PersistedStateTransformer<OldState, State>[],
  ) =>
    createTransform(
      undefined,
      (outboundState: OldState): State => {
        let state: OldState | State = outboundState
        persistedStateTransformers.forEach(({appVersion, transform}) => {
          if (shouldTransform(appVersion, oldAppVersion)) {
            return
          }
          state = (transform(state as OldState) || state) as State
        })

        return state as unknown as State
      },
      {whitelist: [key]},
    )

/**
 * Get the reducers object to pass to Redux's configureStore
 */
export const getReducers =
  (reduxConfigs: (ReduxConfig | undefined)[]) => (version?: string) => {
    const reducers: Record<string, AnyReducer> = {}
    const getTransforms = getStateTransform(version)
    reduxConfigs.forEach(config => {
      if (!config) {
        return
      }
      const {
        key,
        persist,
        persistedStateTransformers,
        slice,
        persistWhitelist: whitelist,
      } = config
      if (!persist) {
        reducers[key] = slice.reducer
      }
      reducers[key] = persistReducer(
        {
          key,
          storage: AsyncStorage,
          transforms: persistedStateTransformers
            ? [getTransforms(key, persistedStateTransformers)]
            : undefined,
          whitelist,
        },
        slice.reducer,
      )
    })

    return reducers
  }
