import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type InternetConnectionState = {
  isConnected: boolean | null
  isInternetReachable: boolean | null
}

const initialState: InternetConnectionState = {
  isConnected: null,
  isInternetReachable: null,
}

export const internetConnectionSlice = createSlice({
  name: ReduxKey.internetConnection,
  initialState,
  reducers: {
    setInternetState: (
      state,
      {
        payload: {isConnected, isInternetReachable},
      }: PayloadAction<InternetConnectionState>,
    ) => {
      state.isConnected = isConnected
      state.isInternetReachable = isInternetReachable
    },
  },
})

export const {setInternetState} = internetConnectionSlice.actions

export const selectIsConnected = (state: RootState) =>
  state[ReduxKey.internetConnection].isConnected

export const selectIsInternetReachable = (state: RootState) =>
  state[ReduxKey.internetConnection].isInternetReachable
