import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import {clientModules, coreModules} from '@/modules'
import {sentryLoggerMiddleware} from '@/processes'
import {baseApi} from '@/services'
import {alertSlice} from '@/store/alertSlice'
import {authSlice} from '@/store/authSlice'
import {bottomSheetSlice} from '@/store/bottomSheetSlice'
import {environmentSlice} from '@/store/environmentSlice'
import {getReduxConfigs, getReducers} from '@/store/getReducers'
import {modulesSlice} from '@/store/modulesSlice'
import {ReduxKey, ReduxConfig} from '@/store/types'
import {themeSlice} from '@/themes/slice'

const baseFunctionalitySlicesConfig: ReduxConfig[] = [
  {key: ReduxKey.alert, slice: alertSlice},
  {key: ReduxKey.auth, slice: authSlice},
  {key: ReduxKey.bottomSheet, slice: bottomSheetSlice},
  {key: ReduxKey.environment, slice: environmentSlice},
  {key: ReduxKey.modules, slice: modulesSlice},
  {key: ReduxKey.theme, slice: themeSlice},
]

const reducers = getReducers([
  ...baseFunctionalitySlicesConfig,
  ...getReduxConfigs(coreModules),
  ...getReduxConfigs(clientModules),
])

export const store = configureStore({
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducers,
  }),
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

    return middleware
  },
})
