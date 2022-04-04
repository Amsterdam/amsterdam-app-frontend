import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import {addressSlice} from '../components/features/address/addressSlice'
import {projectManagerSlice} from '../components/features/project-manager'
import {projectsByTextSlice} from '../components/features/projects'
import {notificationDraftSlice} from '../screens/create-notification'
import {baseApi} from '../services/init'
import {authSlice} from './authSlice'

const addressPersistConfig = {
  key: 'address',
  storage: AsyncStorage,
  blacklist: ['temp'],
}

const projectManagerPersistConfig = {
  key: 'projectManager',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  address: persistReducer(addressPersistConfig, addressSlice.reducer),
  auth: authSlice.reducer,
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
