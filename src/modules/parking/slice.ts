import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ParkingPermitScope} from '@/modules/parking/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ParkingState = {
  currentAccountType?: ParkingPermitScope
  currentPermitName?: string
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  shouldShowIntroScreen: boolean
}

const initialState: ParkingState = {
  currentAccountType: undefined,
  currentPermitName: undefined,
  isLoginStepsActive: false,
  shouldShowIntroScreen: true,
}

export const parkingSlice = createSlice({
  name: ReduxKey.parking,
  initialState,
  reducers: {
    setCurrentAccountType: (
      state,
      {payload}: PayloadAction<ParkingPermitScope>,
    ) => {
      state.currentAccountType = payload
    },
    setCurrentPermitName: (state, {payload}: PayloadAction<string>) => {
      state.currentPermitName = payload
    },
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

export const selectCurrentAccountType = (state: RootState) =>
  state[ReduxKey.parking].currentAccountType

export const selectCurrentPermitName = (state: RootState) =>
  state[ReduxKey.parking].currentPermitName

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.parking].isLoginStepsActive

export const selectShouldShowIntroScreen = (state: RootState) =>
  state[ReduxKey.parking].shouldShowIntroScreen

export const useCurrentParkingAccount = () => {
  const dispatch = useDispatch()
  const currentAccountType = useSelector(selectCurrentAccountType)

  const setCurrentAccountType = useCallback(
    (accountType: ParkingPermitScope) =>
      dispatch(parkingSlice.actions.setCurrentAccountType(accountType)),
    [dispatch],
  )

  return {currentAccountType, setCurrentAccountType}
}

export const useCurrentParkingPermitName = () => {
  const dispatch = useDispatch()
  const currentPermitName = useSelector(selectCurrentPermitName)

  const setCurrentPermitName = useCallback(
    (permitName: string) =>
      dispatch(parkingSlice.actions.setCurrentPermitName(permitName)),
    [dispatch],
  )

  return {currentPermitName, setCurrentPermitName}
}
