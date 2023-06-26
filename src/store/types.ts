import {AnyAction, Reducer} from '@reduxjs/toolkit'
import {Slice} from '@reduxjs/toolkit'
import {MigrationManifest} from 'redux-persist'
import {AddressState} from '@/modules/address/slice'
import {ConstructionWorkState} from '@/modules/construction-work/slice'
import {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import {ContactState} from '@/modules/contact/slice'
import {WasteGuideState} from '@/modules/waste-guide/slice'
import {baseApi} from '@/services/init'
import {store} from '@/store'
import {AlertState} from '@/store/alertSlice'
import {AuthState} from '@/store/authSlice'
import {BottomSheetState} from '@/store/bottomSheetSlice'
import {EnvironmentState} from '@/store/environmentSlice'
import {ModulesState} from '@/store/modulesSlice'
import {ThemeState} from '@/themes/slice'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySlice = Slice<any>

export type ReduxConfig = {
  /**
   * Key for the Redux state.
   */
  key: string
  /**
   * Configuration to transform the persisted state of a module, if any, based on the app or module version
   */
  migrations?: MigrationManifest
  /**
   * The version of the persisted state of this module; we increment this version when we add new migrations for backward compatibility.
   * A module's state will only be persisted if persist version is defined.
   */
  persistVersion?: number
  /**
   * Whitelist with the keys of the data in the redux state that should be persisted (leave undefined to persist the complete state).
   */
  persistWhitelist?: string[]
  /**
   * A redux slice for this module.
   */
  slice: AnySlice
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyReducer = Reducer<any, AnyAction>

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

export type AppDispatch = typeof store.dispatch
