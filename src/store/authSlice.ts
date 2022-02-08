import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '.'

type AuthState = {
  managerToken: string | null
}

export const authSlice = createSlice({
  name: 'auth',
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
  state.auth.managerToken
