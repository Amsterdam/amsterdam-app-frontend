import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey, RootState} from '@/store/types'

export type ModulesState = {
  authorizedModules: string[]
  disabledModules: string[]
}

const initialState: ModulesState = {
  disabledModules: [],
  authorizedModules: [],
}

export const modulesSlice = createSlice({
  name: ReduxKey.modules,
  initialState,
  reducers: {
    resetModules: () => initialState,
    toggleModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {disabledModules} = state

      if (disabledModules?.includes(slug)) {
        return {
          ...state,
          disabledModules: disabledModules.filter(
            moduleSlug => moduleSlug !== slug,
          ),
        }
      }

      state.disabledModules = [...state.disabledModules, slug]
    },
    addAuthorizedModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {authorizedModules} = state

      if (authorizedModules?.includes(slug)) {
        return
      }

      state.authorizedModules = [...state.authorizedModules, slug]
    },
    removeAuthorizedModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {authorizedModules} = state

      if (!authorizedModules?.includes(slug)) {
        return
      }

      state.authorizedModules = authorizedModules.filter(
        moduleSlug => moduleSlug !== slug,
      )
    },
  },
})

export const {
  addAuthorizedModule,
  removeAuthorizedModule,
  resetModules,
  toggleModule,
} = modulesSlice.actions

export const selectDisabledModules = (state: RootState) =>
  state[ReduxKey.modules].disabledModules

export const selectAuthorizedModules = (state: RootState) =>
  state[ReduxKey.modules].authorizedModules
