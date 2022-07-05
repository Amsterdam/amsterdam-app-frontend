import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {Environment, EnvironmentConfig, getEnvironment} from '../environment'
import {RootState} from './'
import {isDevApp} from '@/processes'

type EnvironmentState = {
  environment: Environment
  custom?: Partial<EnvironmentConfig>
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

export const useEnvironment = (): EnvironmentConfig => {
  return useSelector(selectEnvironment)
}
