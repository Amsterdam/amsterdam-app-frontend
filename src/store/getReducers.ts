import AsyncStorage from '@react-native-async-storage/async-storage'
import {createMigrate, persistReducer} from 'redux-persist'
import {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'
import {appFlavour, AppFlavour} from '@/processes'
import {ReduxKey} from '@/store/types/reduxKeys'
import {AnyReducer, ReduxConfig} from '@/store/types/types'

/**
 * Reduce an array of module configurations to an array of Redux slice configurations.
 */
export const getReduxConfigs = <
  T extends CoreModuleConfig | ModuleClientConfig,
>(
  modules: T[],
): ReduxConfig[] =>
  modules.reduce((result: ReduxConfig[], {reduxConfigs}: T) => {
    if (!reduxConfigs) {
      return result
    }

    return [...result, ...reduxConfigs]
  }, [])

/**
 * Get the reducers object to pass to Redux's configureStore
 */
export const getReducers = (reduxConfigs: ReduxConfig[]) => {
  const reducers: Partial<Record<ReduxKey, AnyReducer>> = {}
  reduxConfigs.forEach(config => {
    const {
      key,
      migrations,
      slice,
      persistWhitelist: whitelist,
      persistVersion: version,
    } = config
    if (version === undefined) {
      reducers[key] = slice.reducer
    }
    reducers[key] = persistReducer(
      {
        key,
        storage: AsyncStorage,
        migrate: migrations
          ? createMigrate(migrations, {debug: appFlavour === AppFlavour.local})
          : undefined,
        version,
        whitelist,
      },
      slice.reducer,
    )
  })

  return reducers
}
