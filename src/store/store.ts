import {
  AnyAction,
  ReducersMapObject,
  ThunkMiddleware,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import {useStoreAppVersion} from '@/hooks/useStoreAppVersion'
import {clientModules, coreModules} from '@/modules'
import {sentryLoggerMiddleware} from '@/processes'
import {baseApi} from '@/services'
import {alertSlice} from '@/store/alertSlice'
import {authSlice} from '@/store/authSlice'
import {bottomSheetSlice} from '@/store/bottomSheetSlice'
import {environmentSlice} from '@/store/environmentSlice'
import {getConfigs, getReducers} from '@/store/getReducers'
import {modulesSlice} from '@/store/modulesSlice'
import {ReduxConfig, RootState} from '@/store/types'
import {themeSlice} from '@/themes/slice'

const nonModuleSlicesConfig: ReduxConfig[] = [
  {key: 'alert', slice: alertSlice},
  {key: 'auth', slice: authSlice},
  {key: 'bottomSheet', slice: bottomSheetSlice},
  {key: 'environment', slice: environmentSlice},
  {key: 'modules', slice: modulesSlice},
  {key: 'theme', slice: themeSlice},
]

const getReducersForVersion = getReducers([
  ...nonModuleSlicesConfig,
  ...getConfigs(coreModules),
  ...getConfigs(clientModules),
])

/**
 * Get the store, optionally with a version to handle backward compatibility during rehydration. Note: in the app initialisation process you must use the useStoreAndPersistor hook; this function is exposed only to initialise the store for Storybook.
 */
export const getStore = (version?: string) =>
  configureStore<RootState>({
    reducer: combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      ...getReducersForVersion(version),
    } as unknown as ReducersMapObject<RootState, AnyAction>),
    middleware: getDefaultMiddleware => {
      const middleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          warnAfter: 256,
        },
        immutableCheck: {
          warnAfter: 256,
        },
      }).concat([baseApi.middleware, sentryLoggerMiddleware])
      if (__DEV__) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const createDebugger = require('redux-flipper').default
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
        middleware.push(createDebugger())
      }

      return middleware as unknown as [ThunkMiddleware<RootState, AnyAction>]
    },
  })

/**
 * Get the store and the persistor to finish initializing the Redux providers, after we have retreived the version number to handle any backward compatibility transforms during rehydration.
 */
export const useStoreAndPersistor = () => {
  const version = useStoreAppVersion()

  return useMemo(() => {
    if (!version) {
      return {store: undefined, persistor: undefined}
    }

    const store = getStore(version)

    return {store, persistor: persistStore(store)}
  }, [version])
}
