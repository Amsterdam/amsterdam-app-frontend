import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type ModulesSliceState = {
  authorizedModules: string[]
  disabledModules: string[]
}

const initialState: ModulesSliceState = {
  disabledModules: [],
  authorizedModules: [],
}

export const modulesSlice = createSlice({
  name: 'modules',
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

      state.disabledModules = [...(state.disabledModules ?? []), slug]
    },
    addAuthorizedModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {authorizedModules} = state

      if (authorizedModules?.includes(slug)) {
        return
      }

      state.authorizedModules = [...(state.authorizedModules ?? []), slug]
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
  state.modules.disabledModules
export const selectAuthorizedModules = (state: RootState) =>
  state.modules.authorizedModules
