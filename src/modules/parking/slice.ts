import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ParkingStateCurrentAccount} from '@/modules/parking/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ParkingState = {
  accessToken?: string
  accessTokenExpiration?: string
  currentPermitName?: string
  isLoggingInAdditionalAccount: boolean
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  parkingAccount: ParkingStateCurrentAccount | undefined
  /**
   * Determines whether any screen before the login screen should be skipped so the user automatically navigates to the login screen.
   */
  shouldShowLoginScreen: boolean
  visitorVehicleId?: string
}

const initialState: ParkingState = {
  accessToken: undefined,
  currentPermitName: undefined,
  isLoggingInAdditionalAccount: false,
  isLoginStepsActive: false,
  parkingAccount: undefined,
  shouldShowLoginScreen: false,
  visitorVehicleId: undefined,
  accessTokenExpiration: undefined,
}

export const parkingSlice = createSlice({
  name: ReduxKey.parking,
  initialState,
  reducers: {
    setAccessToken: (state, {payload}: PayloadAction<string | undefined>) => {
      state.accessToken = payload
    },
    setAccessTokenExpiration: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.accessTokenExpiration = payload
    },
    setCurrentPermitName: (state, {payload}: PayloadAction<string>) => {
      state.currentPermitName = payload
    },
    setIsLoggingInAdditionalAccount: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isLoggingInAdditionalAccount = payload
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
    updateParkingAccount: (
      state,
      {payload}: PayloadAction<ParkingState['parkingAccount']>,
    ) => {
      state.parkingAccount = payload
    },
  },
})

export const {
  setAccessTokenExpiration,
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,
} = parkingSlice.actions

export const selectAccessToken = (state: RootState) =>
  state[ReduxKey.parking].accessToken

export const selectAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.parking].accessTokenExpiration

export const selectCurrentPermitName = (state: RootState) =>
  state[ReduxKey.parking].currentPermitName

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.parking].isLoginStepsActive

export const selectIsLoggingInAdditionalAccount = (state: RootState) =>
  state[ReduxKey.parking].isLoggingInAdditionalAccount

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.parking].shouldShowLoginScreen

export const selectVisitorVehicleId = (state: RootState) =>
  state[ReduxKey.parking].visitorVehicleId

export const useParkingAccessToken = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)

  const setAccessToken = useCallback(
    (token: string | undefined) =>
      dispatch(parkingSlice.actions.setAccessToken(token)),
    [dispatch],
  )

  return {accessToken, setAccessToken}
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

export const useIsLoggingInAdditionalAccount = () => {
  const dispatch = useDispatch()
  const isLoggingInAdditionalAccount = useSelector(
    selectIsLoggingInAdditionalAccount,
  )

  const setIsLoggingInAdditionalAccount = useCallback(
    (isLogging: boolean) =>
      dispatch(parkingSlice.actions.setIsLoggingInAdditionalAccount(isLogging)),
    [dispatch],
  )

  return {isLoggingInAdditionalAccount, setIsLoggingInAdditionalAccount}
}
