/* eslint-disable @typescript-eslint/no-explicit-any */
import {BUILD_NUMBER, VERSION} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AnyAction,
  Reducer,
  ReducersMapObject,
  Slice,
  ThunkDispatch,
  ThunkMiddleware,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import {useEffect, useMemo, useState} from 'react'
import {
  createTransform,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import {AsyncStorageKey, useAsyncStorage} from '@/hooks/useAsyncStorage'
import {persistedStateTransformers as persistedAddressStateTransformers} from '@/modules/address/persistedStateTransformers'
import {AddressState, addressSlice} from '@/modules/address/slice'
import {
  ConstructionWorkState,
  constructionWorkSlice,
} from '@/modules/construction-work/slice'
import {
  MessageDraftState,
  messageDraftSlice,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {
  ConstructionWorkEditorState,
  constructionWorkEditorSlice,
} from '@/modules/construction-work-editor/slice'
import {ContactState, contactSlice} from '@/modules/contact/slice'
import {PersistedStateTransformer} from '@/modules/types'
import {WasteGuideState, wasteGuideSlice} from '@/modules/waste-guide/slice'
import {sentryLoggerMiddleware} from '@/processes'
import {baseApi} from '@/services'
import {AlertState, alertSlice} from '@/store/alertSlice'
import {AuthState, authSlice} from '@/store/authSlice'
import {BottomSheetState, bottomSheetSlice} from '@/store/bottomSheetSlice'
import {EnvironmentState, environmentSlice} from '@/store/environmentSlice'
import {ModulesState, modulesSlice} from '@/store/modulesSlice'
import {ThemeState, themeSlice} from '@/themes/slice'

// own file
const isNewer = (a?: string, b?: string) => {
  if (!a || !b) {
    return false
  }
  return a > b
}

// own file plus test
const getStateTransform =
  (oldAppVersion?: string) =>
  <OldState, State>(
    persistedStateTransformers: PersistedStateTransformer<OldState, State>[],
  ) =>
    createTransform(undefined, (outboundState: OldState): State => {
      let state: OldState | State = outboundState
      persistedStateTransformers.forEach(({appVersion, transform}) => {
        if (oldAppVersion && !isNewer(appVersion, oldAppVersion)) {
          return
        }
        state = (transform(state as OldState) || state) as State
      })

      return state as unknown as State
    })

type ReducerConfig = {
  key: string
  persist?: boolean
  persistedStateTransformers?: PersistedStateTransformer<any, any>[]
  slice: Slice<any>
  whitelist?: string[]
}

const getReducers = (config: ReducerConfig[], version?: string) => {
  const result: Record<string, Reducer<any, AnyAction>> = {}

  const getTransforms = getStateTransform(version)

  config.forEach(
    ({key, persist, persistedStateTransformers, slice, whitelist}) => {
      if (!persist) {
        result[key] = slice.reducer
      }
      result[key] = persistReducer(
        {
          key,
          storage: AsyncStorage,
          transforms: persistedStateTransformers
            ? [getTransforms(persistedStateTransformers)]
            : undefined,
          whitelist,
        },
        slice.reducer,
      )
    },
  )

  return result
}

// move to module config
const moduleReducerConfig: ReducerConfig[] = [
  {
    key: 'address',
    persist: true,
    persistedStateTransformers: persistedAddressStateTransformers,
    slice: addressSlice,
  },
  {
    key: 'alert',
    slice: alertSlice,
  },
  {
    key: 'auth',
    persist: true,
    slice: authSlice,
  },
  {
    key: 'bottomSheet',
    slice: bottomSheetSlice,
  },
  {
    key: 'constructionWork',
    persist: true,
    slice: constructionWorkSlice,
    whitelist: ['readArticles'],
  },
  {
    key: 'constructionWorkEditor',
    persist: true,
    slice: constructionWorkEditorSlice,
  },
  {
    key: 'contact',
    persist: true,
    slice: contactSlice,
  },
  {
    key: 'environment',
    persist: true,
    slice: environmentSlice,
  },
  {
    key: 'messageDraft',
    persist: true,
    slice: messageDraftSlice,
  },
  {
    key: 'modules',
    persist: true,
    slice: modulesSlice,
  },
  {
    key: 'wasteGuide',
    persist: true,
    slice: wasteGuideSlice,
  },
]

export const getStore = (version?: string) =>
  configureStore<RootState>({
    reducer: combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      theme: themeSlice.reducer,
      ...getReducers(moduleReducerConfig, version),
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

export const useStoreAndPersistor = () => {
  const [version, setVersion] = useState<string | undefined>()
  const {getFromAsyncStorage, storeInAsyncStorage} = useAsyncStorage<
    string | undefined
  >(AsyncStorageKey.versionNumber)

  useEffect(() => {
    void getFromAsyncStorage().then(setVersion)
    if (!!VERSION && !!BUILD_NUMBER) {
      void storeInAsyncStorage(`${VERSION}.${BUILD_NUMBER}`)
    }
  }, [getFromAsyncStorage, storeInAsyncStorage])

  return useMemo(() => {
    if (!version) {
      return {store: undefined, persistor: undefined}
    }

    const store = getStore(version)

    return {store, persistor: persistStore(store)}
  }, [version])
}

// move to typing file
export type RootState = {
  address: AddressState
  alert: AlertState
  api: typeof baseApi.reducer
  auth: AuthState
  bottomSheet: BottomSheetState
  constructionWork: ConstructionWorkState
  constructionWorkEditor: ConstructionWorkEditorState
  contact: ContactState
  environment: EnvironmentState
  messageDraft: MessageDraftState
  modules: ModulesState
  theme: ThemeState
  wasteGuide: WasteGuideState
}

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>
