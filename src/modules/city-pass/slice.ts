import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type CityPassState = {
  /**
   * Whether the user is been logged in and registered in the city-pass backend.
   */
  isCityPassOwnerRegistered: boolean
  /**
   * Whether the city-passes overlay UI is visible.
   */
  isCityPassesVisible: boolean
  /**
   * The index of the city-passes to start displaying
   */
  startIndex: number
}

const initialState: CityPassState = {
  isCityPassesVisible: false,
  isCityPassOwnerRegistered: false,
  startIndex: 0,
}

export const cityPassSlice = createSlice({
  name: ReduxKey.cityPass,
  initialState,
  reducers: {
    hideCityPasses: state => {
      state.isCityPassesVisible = false
    },
    setIsCityPassOwnerRegistered: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isCityPassOwnerRegistered = payload
    },
    showCityPasses: (state, {payload}: PayloadAction<number | undefined>) => {
      state.isCityPassesVisible = true
      state.startIndex = payload ?? 0
    },
  },
})

export const {hideCityPasses, setIsCityPassOwnerRegistered, showCityPasses} =
  cityPassSlice.actions

export const selectIsCityPassesVisible = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassesVisible

export const selectIsCityPassOwnerRegistered = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassOwnerRegistered

export const selectStartIndex = (state: RootState) =>
  state[ReduxKey.cityPass].startIndex
