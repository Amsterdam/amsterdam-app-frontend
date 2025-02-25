import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ParkingState = {
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  shouldShowIntroScreen: boolean
}

const initialState: ParkingState = {
  isLoginStepsActive: false,
  shouldShowIntroScreen: true,
}

export const parkingSlice = createSlice({
  name: ReduxKey.parking,
  initialState,
  reducers: {
    setLoginStepsActive: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoginStepsActive = payload
    },
    setShouldShowIntroScreen: (state, {payload}: PayloadAction<boolean>) => {
      state.shouldShowIntroScreen = payload
    },
  },
})

export const {
  setLoginStepsActive,
  setShouldShowIntroScreen: setShouldShowIntroScreenAction,
} = parkingSlice.actions

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.parking].isLoginStepsActive

export const selectShouldShowIntroScreen = (state: RootState) =>
  state[ReduxKey.parking].shouldShowIntroScreen
