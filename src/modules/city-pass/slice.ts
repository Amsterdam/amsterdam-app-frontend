import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type CityPassState = {
  cityPass: string | undefined
  isCityPassesVisible: boolean
}

const initialState: CityPassState = {
  cityPass: undefined,
  isCityPassesVisible: false,
}

export const cityPassSlice = createSlice({
  name: ReduxKey.cityPass,
  initialState,
  reducers: {
    hideCityPasses: state => {
      state.isCityPassesVisible = false
    },
    saveCityPass: (state, {payload}: PayloadAction<string>) => {
      state.cityPass = payload
    },
    showCityPasses: state => {
      state.isCityPassesVisible = true
    },
    resetCityPass: state => {
      state.cityPass = undefined
    },
  },
})

export const {hideCityPasses, saveCityPass, resetCityPass, showCityPasses} =
  cityPassSlice.actions

export const selectCityPass = (state: RootState) =>
  state[ReduxKey.cityPass].cityPass

export const selectIsCityPassesVisible = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassesVisible
