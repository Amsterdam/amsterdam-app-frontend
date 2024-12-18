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
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  shouldShowLoginScreen: boolean
  /**
   * The index of the city-passes to start displaying
   */
  startIndex: number
}

const initialState: CityPassState = {
  isCityPassesVisible: false,
  isCityPassOwnerRegistered: false,
  isLoginStepsActive: false,
  shouldShowLoginScreen: true,
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
    setLoginStepsActive: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoginStepsActive = payload
    },
    setShouldShowLoginScreen: (state, {payload}: PayloadAction<boolean>) => {
      state.shouldShowLoginScreen = payload
    },
  },
})

export const {
  hideCityPasses,
  setIsCityPassOwnerRegistered,
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,
  showCityPasses,
} = cityPassSlice.actions

export const selectIsCityPassesVisible = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassesVisible

export const selectIsCityPassOwnerRegistered = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassOwnerRegistered

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.cityPass].isLoginStepsActive

export const selectStartIndex = (state: RootState) =>
  state[ReduxKey.cityPass].startIndex

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.cityPass].shouldShowLoginScreen
