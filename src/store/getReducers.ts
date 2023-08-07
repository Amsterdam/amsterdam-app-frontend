import AsyncStorage from '@react-native-async-storage/async-storage'
import {AnyAction, Reducer} from '@reduxjs/toolkit'
import {createMigrate, persistReducer} from 'redux-persist'
import {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'
import {appFlavour, AppFlavour} from '@/processes/development'
import {ReduxConfig} from '@/store/types/reduxConfig'
import {ReduxKey} from '@/store/types/reduxKey'

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
  const reducers: Partial<Record<ReduxKey, Reducer<unknown, AnyAction>>> = {}

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

      return
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
