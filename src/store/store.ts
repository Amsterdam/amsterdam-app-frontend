import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {Platform} from 'react-native'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import {productTourSlice} from '@/components/features/product-tour/slice'
import {clientModules, coreModules} from '@/modules/modules'
import {reduxLoggerMiddleware} from '@/processes/logging/reduxLoggerMiddleware'
import {baseApi} from '@/services/baseApi'
import {getReduxConfigs, getReducers} from '@/store/getReducers'
import {alertSlice} from '@/store/slices/alert'
import {bottomSheetSlice} from '@/store/slices/bottomSheet'
import {environmentSlice} from '@/store/slices/environment'
import {modulesSlice} from '@/store/slices/modules'
import {permissionsSlice} from '@/store/slices/permissions'
import {updateAppSlice} from '@/store/slices/updateApp'
import {ReduxConfig} from '@/store/types/reduxConfig'
import {ReduxKey} from '@/store/types/reduxKey'
import {themeSlice} from '@/themes/slice'

const baseFunctionalitySlicesConfig: ReduxConfig[] = [
  {key: ReduxKey.alert, slice: alertSlice},
  {key: ReduxKey.bottomSheet, slice: bottomSheetSlice},
  {key: ReduxKey.environment, slice: environmentSlice, persistVersion: -1},
  {key: ReduxKey.modules, slice: modulesSlice, persistVersion: -1},
  {key: ReduxKey.permissions, slice: permissionsSlice},
  {key: ReduxKey.productTour, slice: productTourSlice, persistVersion: -1},
  {key: ReduxKey.theme, slice: themeSlice},
  {key: ReduxKey.updateApp, slice: updateAppSlice, persistVersion: -1},
]

const reducers = getReducers([
  ...baseFunctionalitySlicesConfig,
  ...getReduxConfigs(coreModules),
  ...getReduxConfigs(clientModules),
])

export const store = configureStore({
  enhancers: enhancers => {
    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore somehow required for the redux devtools
      Symbol.asyncIterator ??= Symbol.for('Symbol.asyncIterator')
      require('react-native-get-random-values')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {devToolsEnhancer} = require('@redux-devtools/remote')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {getDeviceNameSync} = require('react-native-device-info')

      return enhancers.concat(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        devToolsEnhancer({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-call
          name: `${Platform.OS} ${Platform.Version} - ${getDeviceNameSync()}`,
          hostname: Platform.select({ios: 'localhost', android: '10.0.2.2'}),
          port: 8000,
          secure: false,
          realtime: true,
        }),
      )
    }

    return enhancers
  },
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducers,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 256,
      },
      immutableCheck: {
        warnAfter: 256,
      },
    }).concat([baseApi.middleware, reduxLoggerMiddleware]),
})
