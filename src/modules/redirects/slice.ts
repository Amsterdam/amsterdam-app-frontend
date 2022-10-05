import {createSlice} from '@reduxjs/toolkit'

export const templateSlice = createSlice({
  name: 'template',
  initialState: {},
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    action: () => {},
  },
})

export const {action} = templateSlice.actions
