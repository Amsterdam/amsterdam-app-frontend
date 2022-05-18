import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import serverModulesMock from './server-modules.mock.json'

type ModuleSlug = string

type State = {
  modules: ModuleSlug[]
}

const initialState: State = {
  modules: serverModulesMock.modules.map(m => m.slug),
}

export const modulesSlice = createSlice({
  name: 'modules',
  initialState: initialState,
  reducers: {
    resetModules: () => initialState,
    toggleModule: (state, {payload: slug}: PayloadAction<ModuleSlug>) => {
      const {modules} = state
      if (modules.includes(slug)) {
        return {modules: modules.filter(module => module !== slug)}
      }
      modules.push(slug)
    },
  },
})

export const {toggleModule} = modulesSlice.actions

export const selectModules = (state: RootState) => state.modules