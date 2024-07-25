import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type InternetState = {
  isConnected?: boolean
  isInternetReachable?: boolean
}

const initialState: InternetState = {}

export const internetSlice = createSlice({
  name: ReduxKey.internet,
  initialState,
  reducers: {
    setInternetState: (
      state,
      {payload: internetState}: PayloadAction<InternetState>,
    ) => {
      state = internetState
    },
  },
})

export const {setInternetState} = internetSlice.actions

export const selectIsConnected = (state: RootState) =>
  state[ReduxKey.internet].isConnected

export const selectIsInternetReachable = (state: RootState) =>
  state[ReduxKey.internet].isInternetReachable
