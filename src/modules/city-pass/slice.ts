import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type CityPassState = {
  cityPass: string | undefined
}

export const cityPassSlice = createSlice({
  name: ReduxKey.cityPass,
  initialState: {} as CityPassState,
  reducers: {
    saveCityPass: (state, {payload}: PayloadAction<string>) => {
      state.cityPass = payload
    },
    resetCityPass: state => {
      state.cityPass = undefined
    },
  },
})

export const {saveCityPass, resetCityPass} = cityPassSlice.actions

export const selectCityPass = (state: RootState) =>
  state[ReduxKey.cityPass].cityPass
