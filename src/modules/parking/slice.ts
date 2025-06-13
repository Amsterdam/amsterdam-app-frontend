import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ParkingPermitScope} from '@/modules/parking/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ParkingState = {
  accessTokenExpiration?: string
  currentAccountType?: ParkingPermitScope
  currentPermitName?: string
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  /**
   * Determines whether any screen before the login screen should be skipped so the user automatically navigates to the login screen.
   */
  shouldShowLoginScreen: boolean
  visitorVehicleId?: string
}

const initialState: ParkingState = {
  currentAccountType: undefined,
  currentPermitName: undefined,
  isLoginStepsActive: false,
  shouldShowLoginScreen: false,
  visitorVehicleId: undefined,
  accessTokenExpiration: undefined,
}

export const parkingSlice = createSlice({
  name: ReduxKey.parking,
  initialState,
  reducers: {
    setCurrentAccountType: (
      state,
      {payload}: PayloadAction<ParkingPermitScope | undefined>,
    ) => {
      state.currentAccountType = payload
    },
    setCurrentPermitName: (state, {payload}: PayloadAction<string>) => {
      state.currentPermitName = payload
    },
    setLoginStepsActive: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoginStepsActive = payload
    },
    setShouldShowLoginScreen: (state, {payload}: PayloadAction<boolean>) => {
      state.shouldShowLoginScreen = payload
    },
    setVisitorVehicleId: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.visitorVehicleId = payload
    },
    setAccessTokenExpiration: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.accessTokenExpiration = payload
    },
  },
})

export const {
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,
  setAccessTokenExpiration,
} = parkingSlice.actions

export const selectCurrentAccountType = (state: RootState) =>
  state[ReduxKey.parking].currentAccountType

export const selectCurrentPermitName = (state: RootState) =>
  state[ReduxKey.parking].currentPermitName

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.parking].isLoginStepsActive

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.parking].shouldShowLoginScreen

export const selectVisitorVehicleId = (state: RootState) =>
  state[ReduxKey.parking].visitorVehicleId

export const selectAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.parking].accessTokenExpiration

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

export const useVisitorVehicleId = () => {
  const dispatch = useDispatch()
  const visitorVehicleId = useSelector(selectVisitorVehicleId)

  const setVisitorVehicleId = useCallback(
    (vehicleId: string | undefined) =>
      dispatch(parkingSlice.actions.setVisitorVehicleId(vehicleId)),
    [dispatch],
  )

  return {visitorVehicleId, setVisitorVehicleId}
}
