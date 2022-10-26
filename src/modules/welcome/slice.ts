import {createSlice} from '@reduxjs/toolkit'

export const welcomeSlice = createSlice({
  name: 'welcome',
  initialState: {},
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    action: () => {},
  },
})

export const {action} = welcomeSlice.actions
