import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AccessCodeType} from '@/modules/access-code/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

const MAX_ATTEMPTS = 5

export type AccessCodeState = {
  attemptsLeft: number
  [AccessCodeType.codeEntered]: number[]
  [AccessCodeType.codeConfirmed]: number[]
  [AccessCodeType.codeSet]: number[]
  codeValidTimestamp?: number
  error?: string
  isCodeConfirmed: boolean
  isCodeSet: boolean
  isCodeValid: boolean
  isEnteringCode: boolean
  useBiometrics?: boolean
}

const initialValue: AccessCodeState = {
  attemptsLeft: MAX_ATTEMPTS,
  [AccessCodeType.codeEntered]: [],
  [AccessCodeType.codeConfirmed]: [],
  [AccessCodeType.codeSet]: [],
  codeValidTimestamp: undefined,
  error: undefined,
  isCodeSet: false,
  isCodeConfirmed: false,
  isCodeValid: false,
  isEnteringCode: false,
  useBiometrics: undefined,
}

export const accessCodeSlice = createSlice({
  name: 'accessCode',
  initialState: initialValue,
  reducers: {
    addDigit: (
      state,
      {
        payload: {digit, type},
      }: PayloadAction<{digit: number; type: AccessCodeType}>,
    ) => {
      state[type].push(digit)
    },
    removeDigit: (state, {payload: type}: PayloadAction<AccessCodeType>) => {
      state[type].pop()
    },
    reset: () => initialValue,
    setCode: (
      state,
      {
        payload: {code, type},
      }: PayloadAction<{code: number[]; type: AccessCodeType}>,
    ) => {
      state[type] = code
    },
    resetAttemptsLeft: state => {
      state.attemptsLeft = initialValue.attemptsLeft
    },
    setAttemptsLeft: (state, {payload}: PayloadAction<number>) => {
      state.attemptsLeft = payload
    },
    setError: (state, {payload}: PayloadAction<string | undefined>) => {
      state.error = payload
    },
    setIsCodeSet: (state, {payload}: PayloadAction<boolean>) => {
      state.isCodeSet = payload
    },
    setIsCodeConfirmed: (state, {payload}: PayloadAction<boolean>) => {
      state.isCodeConfirmed = payload
    },
    setIsCodeValid: (state, {payload}: PayloadAction<boolean>) => {
      if (payload) {
        state.isCodeValid = true
        state.codeValidTimestamp = Date.now()
      } else {
        state.isCodeValid = false
        state.codeValidTimestamp = undefined
      }
    },
    setIsEnteringCode: (state, {payload}: PayloadAction<boolean>) => {
      state.isEnteringCode = payload
    },
    setUseBiometrics: (state, {payload}: PayloadAction<boolean>) => {
      state.useBiometrics = payload
    },
  },
})

export const {
  reset,
  resetAttemptsLeft,
  setAttemptsLeft,
  setError,
  setIsCodeValid,
} = accessCodeSlice.actions

const selectCodeEntered = (state: RootState) =>
  state[ReduxKey.accessCode].codeEntered

const selectCodeSet = (state: RootState) => state[ReduxKey.accessCode].codeSet
const selectCodeConfirmed = (state: RootState) =>
  state[ReduxKey.accessCode].codeConfirmed

const selectAttemptsLeft = (state: RootState) =>
  state[ReduxKey.accessCode].attemptsLeft

const selectError = (state: RootState) => state[ReduxKey.accessCode].error

const selectIsCodeSet = (state: RootState) =>
  state[ReduxKey.accessCode].isCodeSet

const selectIsCodeConfirmed = (state: RootState) =>
  state[ReduxKey.accessCode].isCodeConfirmed

const selectIsCodeValid = (state: RootState) =>
  state[ReduxKey.accessCode].isCodeValid

const selectIsEnteringCode = (state: RootState) =>
  state[ReduxKey.accessCode].isEnteringCode

const selectCodeValidTimestamp = (state: RootState) =>
  state[ReduxKey.accessCode].codeValidTimestamp

const selectUseBiometrics = (state: RootState) =>
  state[ReduxKey.accessCode].useBiometrics

export {
  selectAttemptsLeft,
  selectCodeConfirmed,
  selectCodeEntered,
  selectCodeSet,
  selectCodeValidTimestamp,
  selectError,
  selectIsCodeConfirmed,
  selectIsCodeSet,
  selectIsCodeValid,
  selectIsEnteringCode,
  selectUseBiometrics,
}
