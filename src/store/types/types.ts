import {AnyAction, Reducer} from '@reduxjs/toolkit'
import {Slice} from '@reduxjs/toolkit'
import {MigrationManifest} from 'redux-persist'
import {ReduxKey} from '@/store/types/reduxKeys'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySlice = Slice<any>

export type ReduxConfig = {
  /**
   * Key for the Redux state.
   */
  key: ReduxKey
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

export type AnyReducer = Reducer<unknown, AnyAction>
