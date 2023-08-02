import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Environment, EnvironmentConfig, getEnvironment} from '@/environment'
import {isDevApp} from '@/processes/development'
import {useAppSelector} from '@/store/hooks'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type EnvironmentState = {
  custom?: Partial<EnvironmentConfig>
  environment: Environment
}

export const environmentSlice = createSlice({
  name: ReduxKey.environment,
  initialState: {
    environment: isDevApp ? Environment.acceptance : Environment.production,
  } as EnvironmentState,
  reducers: {
    setEnvironment: (state, {payload}: PayloadAction<Environment>) => {
      state.environment = payload
    },
    setCustomEnvironment: (
      state,
      {payload}: PayloadAction<Partial<EnvironmentConfig>>,
    ) => {
      state.custom = payload
    },
  },
})

export const {setEnvironment, setCustomEnvironment} = environmentSlice.actions

export const selectEnvironment = (state: RootState) =>
  getEnvironment(
    state[ReduxKey.environment].environment,
    state[ReduxKey.environment].custom,
  )

export const selectEnvironmentConfig = (state: RootState) =>
  state[ReduxKey.environment]

export const useEnvironment = () => useAppSelector(selectEnvironment)
