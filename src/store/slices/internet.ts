import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type InternetState = {
  isConnected: boolean | null
  isInternetReachable: boolean | null
}

const initialState: InternetState = {
  isConnected: null,
  isInternetReachable: null,
}

export const internetSlice = createSlice({
  name: ReduxKey.internet,
  initialState,
  reducers: {
    setInternetState: (
      state,
      {
        payload: {isConnected, isInternetReachable},
      }: PayloadAction<InternetState>,
    ) => {
      state.isConnected = isConnected
      state.isInternetReachable = isInternetReachable
    },
  },
})

export const {setInternetState} = internetSlice.actions

export const selectIsConnected = (state: RootState) =>
  state[ReduxKey.internet].isConnected

export const selectIsInternetReachable = (state: RootState) =>
  state[ReduxKey.internet].isInternetReachable
