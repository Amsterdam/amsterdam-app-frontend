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
import {addressSlice} from '@/modules/address/addressSlice'
import {projectManagerSlice} from '@/modules/construction-work/components/project-manager'
import {constructionWorkSlice} from '@/modules/construction-work/construction-work.slice'
import {notificationDraftSlice} from '@/modules/construction-work/screens/create-notification'
import {modulesSlice} from '@/modules/home/store/modulesSlice'
import {sentryLoggerMiddleware} from '@/processes'
import {baseApi} from '@/services'
import {alertSlice, authSlice, environmentSlice} from '@/store'
import {themeSlice} from '@/themes/themeSlice'

const addressPersistConfig = {
  key: 'address',
  storage: AsyncStorage,
  blacklist: ['temp'],
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

const projectManagerPersistConfig = {
  key: 'projectManager',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  address: persistReducer(addressPersistConfig, addressSlice.reducer),
  alert: alertSlice.reducer,
  auth: authSlice.reducer,
  environment: persistReducer(
    environmentPersistConfig,
    environmentSlice.reducer,
  ),
  modules: persistReducer(modulesPersistConfig, modulesSlice.reducer),
  constructionWork: persistReducer(
    constructionWorkPersistConfig,
    constructionWorkSlice.reducer,
  ),
  notificationDraft: notificationDraftSlice.reducer,
  projectManager: persistReducer(
    projectManagerPersistConfig,
    projectManagerSlice.reducer,
  ),
  theme: themeSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware, sentryLoggerMiddleware])
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default
      middleware.push(createDebugger())
    }
    return middleware
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
