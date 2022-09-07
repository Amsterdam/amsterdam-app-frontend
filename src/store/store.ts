import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import {addressSlice} from '@/modules/address/slice'
import {messageDraftSlice} from '@/modules/construction-work-editor/messageDraftSlice'
import {constructionWorkEditorSlice} from '@/modules/construction-work-editor/slice'
import {constructionWorkSlice} from '@/modules/construction-work/slice'
import {contactSlice} from '@/modules/contact/slice'
import {sentryLoggerMiddleware} from '@/processes'
import {baseApi} from '@/services'
import {alertSlice} from '@/store/alertSlice'
import {authSlice} from '@/store/authSlice'
import {environmentSlice} from '@/store/environmentSlice'
import {modulesSlice} from '@/store/modulesSlice'
import {themeSlice} from '@/themes/slice'

const addressPersistConfig = {
  key: 'address',
  storage: AsyncStorage,
  blacklist: ['temp'],
}

const contactPersistConfig = {
  key: 'contact',
  storage: AsyncStorage,
}

const environmentPersistConfig = {
  key: 'environment',
  storage: AsyncStorage,
}

const modulesPersistConfig = {
  key: 'modules',
  storage: AsyncStorage,
}

const constructionWorkPersistConfig = {
  key: 'constructionWork',
  storage: AsyncStorage,
  whitelist: ['readArticles'],
}

const constructionWorkEditorPersistConfig = {
  key: 'constructionWorkEditor',
  storage: AsyncStorage,
}

const messageDraftPersistConfig = {
  key: 'messageDraft',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  address: persistReducer(addressPersistConfig, addressSlice.reducer),
  alert: alertSlice.reducer,
  auth: authSlice.reducer,
  contact: persistReducer(contactPersistConfig, contactSlice.reducer),
  environment: persistReducer(
    environmentPersistConfig,
    environmentSlice.reducer,
  ),
  modules: persistReducer(modulesPersistConfig, modulesSlice.reducer),
  constructionWork: persistReducer(
    constructionWorkPersistConfig,
    constructionWorkSlice.reducer,
  ),
  messageDraft: persistReducer(
    messageDraftPersistConfig,
    messageDraftSlice.reducer,
  ),
  constructionWorkEditor: persistReducer(
    constructionWorkEditorPersistConfig,
    constructionWorkEditorSlice.reducer,
  ),
  theme: themeSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,

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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
