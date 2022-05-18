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
import {notificationsSlice} from '../components/features/notifications'
import {projectManagerSlice} from '../components/features/project-manager'
import {projectsByTextSlice} from '../components/features/projects'
import {addressSlice} from '../modules/address/addressSlice'
import {modulesSlice} from '../modules/home/store/modulesSlice'
import {notificationDraftSlice} from '../screens/create-notification'
import {baseApi} from '../services/init'
import {authSlice} from './authSlice'

const addressPersistConfig = {
  key: 'address',
  storage: AsyncStorage,
  blacklist: ['temp'],
}

const modulesPersistConfig = {
  key: 'modules',
  storage: AsyncStorage,
}

const notificationsPersistConfig = {
  key: 'notifications',
  storage: AsyncStorage,
}

const projectManagerPersistConfig = {
  key: 'projectManager',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  address: persistReducer(addressPersistConfig, addressSlice.reducer),
  auth: authSlice.reducer,
  modules: persistReducer(modulesPersistConfig, modulesSlice.reducer),
  notifications: persistReducer(
    notificationsPersistConfig,
    notificationsSlice.reducer,
  ),
  notificationDraft: notificationDraftSlice.reducer,
  projectManager: persistReducer(
    projectManagerPersistConfig,
    projectManagerSlice.reducer,
  ),
  projectsSearch: projectsByTextSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
