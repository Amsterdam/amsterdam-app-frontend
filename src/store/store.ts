import {configureStore} from '@reduxjs/toolkit'
import {addressSlice} from '../components/features/address/addressSlice'
import {projectsByTextSlice} from '../components/features/projects'
import {notificationDraftSlice} from '../screens/create-notification'
import {articlesApi} from '../services/articles'
import {baseApi} from '../services/init'
import {authSlice} from './authSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    address: addressSlice.reducer,
    auth: authSlice.reducer,
    notificationDraft: notificationDraftSlice.reducer,
    projectsSearch: projectsByTextSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(articlesApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
