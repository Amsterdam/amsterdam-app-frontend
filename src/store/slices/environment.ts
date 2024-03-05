import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Environment, getApi, ApiSlug, editableApiSlug} from '@/environment'
import {isDevApp} from '@/processes/development'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export const customDefaultUrls = {
  [editableApiSlug.constructionWork]:
    'http://localhost:8000/construction-work/api/v1',
  [editableApiSlug.contact]: 'http://localhost:8000/contact/api/v1',
  [editableApiSlug.modules]: 'http://localhost:9000/modules/api/v1',
}

export type EnvironmentState = {
  custom: typeof customDefaultUrls
  environment: Environment
}

export const environmentSlice = createSlice({
  name: ReduxKey.environment,
  initialState: {
    custom: customDefaultUrls,
    environment: isDevApp ? Environment.acceptance : Environment.production,
  } as EnvironmentState,
  reducers: {
    setEnvironment: (state, {payload}: PayloadAction<Environment>) => {
      state.environment = payload
    },
    setCustomEnvironment: (
      state,
      {payload}: PayloadAction<Partial<typeof customDefaultUrls>>,
    ) => {
      state.custom = {...state.custom, ...payload}
    },
  },
})

export const {setEnvironment, setCustomEnvironment} = environmentSlice.actions

export const selectEnvironment = (state: RootState) =>
  state[ReduxKey.environment]

export const selectApi = (state: RootState, api: ApiSlug) =>
  getApi(
    state[ReduxKey.environment].environment,
    state[ReduxKey.environment].custom,
    api,
  )

export const selectEnvironmentConfig = (state: RootState) =>
  state[ReduxKey.environment]
