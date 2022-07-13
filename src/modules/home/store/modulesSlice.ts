import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type ModulesSliceState = {
  disabledModules: string[] | undefined
}

const initialState: ModulesSliceState = {
  disabledModules: [],
}

export const modulesSlice = createSlice({
  name: 'disabledModules',
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
  },
})

export const {resetModules, toggleModule} = modulesSlice.actions

export const selectDisabledModules = (state: RootState) => state.modules
