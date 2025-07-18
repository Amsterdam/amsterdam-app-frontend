import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleServerConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ModulesState = {
  authorizedModules: string[]
  cachedServerModules?: ModuleServerConfig[]
  disabledModules: string[]
}

const initialState: ModulesState = {
  disabledModules: [],
  authorizedModules: [],
  cachedServerModules: undefined,
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
    setCachedServerModules: (
      state,
      {payload: newCachedServerModules}: PayloadAction<ModuleServerConfig[]>,
    ) => {
      state.cachedServerModules = newCachedServerModules
    },
  },
})

export const {
  addAuthorizedModule,
  removeAuthorizedModule,
  resetModules,
  toggleModule,
  setCachedServerModules,
} = modulesSlice.actions

export const selectDisabledModules = (state: RootState) =>
  state[ReduxKey.modules].disabledModules

export const selectAuthorizedModules = (state: RootState) =>
  state[ReduxKey.modules].authorizedModules

export const selectCachedServerModules = (state: RootState) =>
  state[ReduxKey.modules].cachedServerModules

export const useGetCachedServerModule = (slug: ModuleSlug) => {
  const cachedModules = useSelector(selectCachedServerModules)

  return cachedModules?.find(module => module.moduleSlug === slug)
}
