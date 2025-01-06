import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type CityPassState = {
  /**
   * Whether the user is been logged in and registered in the city-pass backend.
   */
  isCityPassOwnerRegistered: boolean
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
  isCityPassOwnerRegistered: false,
  isLoginStepsActive: false,
  shouldShowLoginScreen: true,
  startIndex: 0,
}

export const cityPassSlice = createSlice({
  name: ReduxKey.cityPass,
  initialState,
  reducers: {
    setIsCityPassOwnerRegistered: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isCityPassOwnerRegistered = payload
    },
    setLoginStepsActive: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoginStepsActive = payload
    },
    setShouldShowLoginScreen: (state, {payload}: PayloadAction<boolean>) => {
      state.shouldShowLoginScreen = payload
    },
    setStartIndex: (state, {payload}: PayloadAction<number | undefined>) => {
      state.startIndex = payload ?? 0
    },
  },
})

export const {
  setIsCityPassOwnerRegistered,
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,
  setStartIndex,
} = cityPassSlice.actions

export const selectIsCityPassOwnerRegistered = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassOwnerRegistered

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.cityPass].isLoginStepsActive

export const selectStartIndex = (state: RootState) =>
  state[ReduxKey.cityPass].startIndex

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.cityPass].shouldShowLoginScreen
