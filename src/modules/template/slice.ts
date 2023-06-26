import {createSlice} from '@reduxjs/toolkit'
// import {ReduxKey, RootState} from '@/store/types'

export type TemplateState = {
  something?: unknown
}

const initialState: TemplateState = {}

export const templateSlice = createSlice({
  name: 'template', // add a ReduxKey for this
  initialState,
  reducers: {
    action: state => state,
  },
})

export const {action} = templateSlice.actions

// export const selectSomething = (state: RootState) =>
//   state[ReduxKey.template].something
