import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type ModulesSliceState = {
  modules: string[] | undefined
}

const initialState: ModulesSliceState = {
  modules: undefined,
}

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    initializeModules: (
      state,
      {payload: moduleSlugs}: PayloadAction<string[]>,
    ) => {
      state.modules = moduleSlugs
    },
    resetModules: () => initialState,
    toggleModule: (state, {payload: slug}: PayloadAction<string>) => {
      const {modules} = state

      if (modules?.includes(slug)) {
        return {
          ...state,
          modules: modules.filter(moduleSlug => moduleSlug !== slug),
        }
      }

      state.modules = [...(state.modules ?? []), slug]
    },
  },
})

export const {initializeModules, resetModules, toggleModule} =
  modulesSlice.actions

export const selectModules = (state: RootState) => state.modules
