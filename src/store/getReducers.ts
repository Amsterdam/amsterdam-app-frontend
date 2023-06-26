import AsyncStorage from '@react-native-async-storage/async-storage'
import {createTransform, persistReducer} from 'redux-persist'
import {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'
import {AnyReducer, PersistedStateTransformer, ReduxConfig} from '@/store/types'
import {versionCompare} from '@/utils/version'

/**
 * Reduce an array of module configurations to an array of Redux slice configurations.
 */
export const getConfigs = <T extends CoreModuleConfig | ModuleClientConfig>(
  modules: T[],
): ReduxConfig[] =>
  modules.reduce((result: ReduxConfig[], {reduxConfigs}: T) => {
    if (!reduxConfigs) {
      return result
    }

    return [...result, ...reduxConfigs]
  }, [])

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
  try {
    return versionCompare(appVersion, oldAppVersion) > 0
  } catch {
    return false
  }
}

/**
 * Create the transform for a slice, to handle backward compatibility for the Redux state.
 */
const getStateTransform =
  (oldAppVersion?: string) =>
  <OldState, State>(
    key: string,
    transformers: PersistedStateTransformer<OldState, State>[],
  ) =>
    createTransform(undefined, (outboundState: OldState): State => {
      let state: OldState | State = outboundState
      transformers.forEach(({appVersion, transform}) => {
        if (!shouldTransform(appVersion, oldAppVersion)) {
          return
        }
        state = (transform(state as OldState) || state) as State
      })

      return state as unknown as State
    })

/**
 * Get the reducers object to pass to Redux's configureStore
 */
export const getReducers =
  (reduxConfigs: ReduxConfig[]) => (version?: string) => {
    const reducers: Record<string, AnyReducer> = {}
    const getTransforms = getStateTransform(version)
    reduxConfigs.forEach(config => {
      const {
        key,
        persist,
        transformers,
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
          transforms: transformers
            ? [getTransforms(key, transformers)]
            : undefined,
          whitelist,
        },
        slice.reducer,
      )

      console.log(
        'asasa',

        persistReducer(
          {
            key,
            storage: AsyncStorage,
            whitelist,
          },
          slice.reducer,
        ),
      )
    })

    return reducers
  }
