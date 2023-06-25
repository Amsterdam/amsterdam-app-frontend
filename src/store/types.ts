import {AnyAction, Reducer, Store, ThunkDispatch} from '@reduxjs/toolkit'
import {Slice} from '@reduxjs/toolkit'
import {AddressState} from '@/modules/address/slice'
import {ConstructionWorkState} from '@/modules/construction-work/slice'
import {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import {ContactState} from '@/modules/contact/slice'
import {WasteGuideState} from '@/modules/waste-guide/slice'
import {baseApi} from '@/services/init'
import {AlertState} from '@/store/alertSlice'
import {AuthState} from '@/store/authSlice'
import {BottomSheetState} from '@/store/bottomSheetSlice'
import {EnvironmentState} from '@/store/environmentSlice'
import {ModulesState} from '@/store/modulesSlice'
import {ThemeState} from '@/themes/slice'

export type PersistedStateTransformer<OldState, State> = {
  appVersion: ((oldVersion?: string) => boolean) | string
  transform: (state: OldState) => State | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyPersistedStateTransformer = PersistedStateTransformer<any, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySlice = Slice<any>

export type ReduxConfig = {
  /**
   * Key for the Redux state. The state will use the ModuleSlug unless overridden here.
   */
  key: string
  /**
   * Should (part of the) redux state of this module's slice be persisted?
   */
  persist?: boolean
  /**
   * Whitelist with the keys of the data in the redux state that should be persisted (leave undefined to persist the complete state).
   */
  persistWhitelist?: string[]
  /**
   * Configuration to transform the persisted state of a module, if any, based on the app or module version
   */
  persistedStateTransformers?: AnyPersistedStateTransformer[]
  /**
   * The redux slice for this module
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

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

export type AppStore = Store<RootState, AnyAction>
