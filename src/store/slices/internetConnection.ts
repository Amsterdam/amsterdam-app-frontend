import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type InternetConnectionState = {
  isConnected: boolean | null
  isInternetReachable: boolean | null
  isNoInternetFullScreenErrorVisible: boolean
}

const initialState: InternetConnectionState = {
  isConnected: null,
  isInternetReachable: null,
  isNoInternetFullScreenErrorVisible: false,
}

export const internetConnectionSlice = createSlice({
  name: ReduxKey.internetConnection,
  initialState,
  reducers: {
    setInternetState: (
      state,
      {
        payload: {isConnected, isInternetReachable},
      }: PayloadAction<
        Pick<InternetConnectionState, 'isConnected' | 'isInternetReachable'>
      >,
    ) => {
      state.isConnected = isConnected
      state.isInternetReachable = isInternetReachable
    },
    setIsNoInternetFullScreenErrorVisible: (
      state,
      {payload: value}: PayloadAction<boolean>,
    ) => {
      state.isNoInternetFullScreenErrorVisible = value
    },
  },
})

export const {setInternetState, setIsNoInternetFullScreenErrorVisible} =
  internetConnectionSlice.actions

export const selectIsConnected = (state: RootState) =>
  state[ReduxKey.internetConnection].isConnected

export const selectIsInternetReachable = (state: RootState) =>
  state[ReduxKey.internetConnection].isInternetReachable

export const selectIsNoInternetFullScreenErrorVisible = (state: RootState) =>
  state[ReduxKey.internetConnection].isNoInternetFullScreenErrorVisible
