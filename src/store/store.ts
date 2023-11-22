import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import {clientModules, coreModules} from '@/modules/modules'
import {sentryLoggerMiddleware} from '@/processes/sentry'
import {baseApi} from '@/services/init'
import {getReduxConfigs, getReducers} from '@/store/getReducers'
import {alertSlice} from '@/store/slices/alert'
import {authSlice} from '@/store/slices/auth'
import {bottomSheetSlice} from '@/store/slices/bottomSheet'
import {environmentSlice} from '@/store/slices/environment'
import {modulesSlice} from '@/store/slices/modules'
import {onboardingSlice} from '@/store/slices/product-tour.slice'
import {ReduxConfig} from '@/store/types/reduxConfig'
import {ReduxKey} from '@/store/types/reduxKey'
import {themeSlice} from '@/themes/slice'

const baseFunctionalitySlicesConfig: ReduxConfig[] = [
  {key: ReduxKey.alert, slice: alertSlice},
  {key: ReduxKey.auth, slice: authSlice, persistVersion: -1},
  {key: ReduxKey.bottomSheet, slice: bottomSheetSlice},
  {key: ReduxKey.environment, slice: environmentSlice, persistVersion: -1},
  {key: ReduxKey.modules, slice: modulesSlice, persistVersion: -1},
  {key: ReduxKey.onboarding, slice: onboardingSlice, persistVersion: -1},
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
