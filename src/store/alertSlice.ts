import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LayoutAnimation} from 'react-native'
import {RootState} from './store'

type Content =
  | {
      title: string | undefined
      text: string | undefined
    }
  | undefined

export type Variant = 'success' | 'failure'

type AlertSliceState = {
  content?: Content
  isVisible: boolean
  variant?: Variant
}

const initialState: AlertSliceState = {
  content: undefined,
  isVisible: false,
  variant: undefined,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (_state, {payload: alert}: PayloadAction<AlertSliceState>) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      return alert
    },
    setAlertVisibility: (
      state,
      {payload: isVisible}: PayloadAction<boolean>,
    ) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      state.isVisible = isVisible
    },
  },
})

export const {setAlert, setAlertVisibility} = alertSlice.actions

export const selectAlertContent = ({alert}: RootState) => alert.content
export const selectAlertVisibility = ({alert}: RootState) => alert.isVisible
export const selectAlertVariant = ({alert}: RootState) => alert.variant
