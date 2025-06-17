import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ParkingAccount} from '@/modules/parking/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ParkingState = {
  accessTokens: Record<
    string,
    {accessToken: string; accessTokenExpiration: string}
  >
  accounts: Record<string, ParkingAccount>
  currentAccount?: string
  currentPermitReportCode?: string
  isLoggingInAdditionalAccount: boolean
  isLoggingOut: boolean
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  isWaitingForWalletBalanceIncrease: boolean
  /**
   * Determines whether any screen before the login screen should be skipped so the user automatically navigates to the login screen.
   */
  shouldShowLoginScreen: boolean
  visitorVehicleId?: string
  walletBalance?: number
}

const initialState: ParkingState = {
  accessTokens: {},
  accounts: {},
  currentPermitReportCode: undefined,
  isLoggingInAdditionalAccount: false,
  isLoggingOut: false,
  isLoginStepsActive: false,
  isWaitingForWalletBalanceIncrease: false,
  currentAccount: undefined,
  shouldShowLoginScreen: false,
  visitorVehicleId: undefined,
  walletBalance: undefined,
}

export const parkingSlice = createSlice({
  name: ReduxKey.parking,
  initialState,
  reducers: {
    removeParkingAccount: state => {
      if (!state.currentAccount) {
        return
      }

      delete state.accessTokens[state.currentAccount]
      delete state.accounts[state.currentAccount]
      state.currentAccount = Object.keys(state.accounts)[0]
      state.currentPermitReportCode = undefined
      state.visitorVehicleId = undefined
    },
    setAccessToken: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string
        accessTokenExpiration: string
        reportCode: string
      }>,
    ) => {
      state.accessTokens[payload.reportCode] = {
        accessToken: payload.accessToken,
        accessTokenExpiration: payload.accessTokenExpiration,
      }
    },
    setCurrentPermitReportCode: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.currentPermitReportCode = payload
    },
    setIsLoggingInAdditionalAccount: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isLoggingInAdditionalAccount = payload
    },
    setIsLoggingOut: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoggingOut = payload
    },
    setIsWaitingForWalletBalanceIncrease: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isWaitingForWalletBalanceIncrease = payload
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
    setParkingAccount: (state, {payload}: PayloadAction<ParkingAccount>) => {
      state.accounts[payload.reportCode] = payload
    },
    setParkingAccountPermits: (
      state,
      {payload}: PayloadAction<ParkingAccount['permits']>,
    ) => {
      if (!state.currentAccount) {
        return
      }

      state.accounts[state.currentAccount].permits = payload
    },
    setCurrentAccount: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.currentAccount = payload
    },
    setWalletBalance: (state, {payload}: PayloadAction<number | undefined>) => {
      state.walletBalance = payload
    },
  },
})

export const {
  setIsLoggingOut,
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,
  setWalletBalance,
  setIsWaitingForWalletBalanceIncrease,
} = parkingSlice.actions

export const selectAccessToken = (state: RootState) =>
  state[ReduxKey.parking].currentAccount
    ? state[ReduxKey.parking].accessTokens[
        state[ReduxKey.parking].currentAccount
      ]?.accessToken
    : undefined

export const selectAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.parking].currentAccount
    ? state[ReduxKey.parking].accessTokens[
        state[ReduxKey.parking].currentAccount
      ]?.accessTokenExpiration
    : undefined

export const selectCurrentPermitReportCode = (state: RootState) =>
  state[ReduxKey.parking].currentPermitReportCode

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.parking].isLoginStepsActive

export const selectIsLoggingInAdditionalAccount = (state: RootState) =>
  state[ReduxKey.parking].isLoggingInAdditionalAccount

export const selectIsLoggingOut = (state: RootState) =>
  state[ReduxKey.parking].isLoggingOut

export const selectIsWaitingForWalletBalanceIncrease = (state: RootState) =>
  state[ReduxKey.parking].isWaitingForWalletBalanceIncrease

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.parking].shouldShowLoginScreen

export const selectVisitorVehicleId = (state: RootState) =>
  state[ReduxKey.parking].visitorVehicleId

export const selectParkingAccounts = (state: RootState) =>
  state[ReduxKey.parking].accounts

export const selectParkingAccount = (state: RootState) =>
  state[ReduxKey.parking].currentAccount
    ? state[ReduxKey.parking].accounts[state[ReduxKey.parking].currentAccount]
    : undefined

export const selectCurrentParkingAccount = (state: RootState) =>
  state[ReduxKey.parking].currentAccount

export const selectWalletBalance = (state: RootState) =>
  state[ReduxKey.parking].walletBalance

// split selectors and dispatch
export const useParkingAccessToken = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const accessTokenExpiration = useSelector(selectAccessTokenExpiration)

  const setAccessToken = useCallback(
    (reportCode: string, token: string, expiration: string) =>
      dispatch(
        parkingSlice.actions.setAccessToken({
          reportCode,
          accessToken: token,
          accessTokenExpiration: expiration,
        }),
      ),
    [dispatch],
  )

  return {
    accessToken,
    setAccessToken,
    accessTokenExpiration,
  }
}

export const useParkingAccount = () => useSelector(selectParkingAccount)
export const useParkingAccounts = () => useSelector(selectParkingAccounts)

export const useParkingAccountIsLoggingOut = () =>
  useSelector(selectIsLoggingOut)

export const useIsWaitingForWalletBalanceIncrease = () =>
  useSelector(selectIsWaitingForWalletBalanceIncrease)

export const useCurrentParkingPermitReportCode = () =>
  useSelector(selectCurrentPermitReportCode)

export const useCurrentParkingAccount = () =>
  useSelector(selectCurrentParkingAccount)

export const useWalletBalance = () => useSelector(selectWalletBalance)

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
