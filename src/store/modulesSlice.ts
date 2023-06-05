import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type ModulesSliceState = {
  disabledModules: string[]
  prohibitedModules: string[]
}

const initialState: ModulesSliceState = {
  disabledModules: [],
  prohibitedModules: [],
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
    addProhibitedModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {prohibitedModules} = state

      if (prohibitedModules?.includes(slug)) {
        return
      }

      state.prohibitedModules = [...(state.prohibitedModules ?? []), slug]
    },
    removeProhibitedModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {prohibitedModules} = state

      if (!prohibitedModules?.includes(slug)) {
        return
      }

      state.prohibitedModules = prohibitedModules.filter(
        moduleSlug => moduleSlug !== slug,
      )
    },
  },
})

export const {
  addProhibitedModule,
  removeProhibitedModule,
  resetModules,
  toggleModule,
} = modulesSlice.actions

export const selectDisabledModules = (state: RootState) =>
  state.modules.disabledModules
export const selectProhibitedModules = (state: RootState) =>
  state.modules.prohibitedModules
