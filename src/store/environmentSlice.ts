import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {Environment, EnvironmentConfig, getEnvironment} from '@/environment'
import {isDevApp} from '@/processes'
import {RootState} from '@/store'

export type EnvironmentState = {
  custom?: Partial<EnvironmentConfig>
  environment: Environment
}

export const environmentSlice = createSlice({
  name: 'environment',
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
  getEnvironment(state.environment.environment, state.environment.custom)

export const selectEnvironmentConfig = (state: RootState) => state.environment

export const useEnvironment = (): EnvironmentConfig =>
  useSelector(selectEnvironment)
