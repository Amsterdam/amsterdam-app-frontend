import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey, RootState} from '@/store/types'

export type AuthState = {
  managerToken: string | null
}

export const authSlice = createSlice({
  name: ReduxKey.auth,
  initialState: {managerToken: null} as AuthState,
  reducers: {
    setCredentials: (
      state,
      {payload: {managerToken}}: PayloadAction<{managerToken: string}>,
    ) => {
      state.managerToken = managerToken
    },
  },
})

export const {setCredentials} = authSlice.actions

export const selectAuthManagerToken = (state: RootState) =>
  state[ReduxKey.auth].managerToken
