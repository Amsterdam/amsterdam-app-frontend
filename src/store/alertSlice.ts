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
    setAlertContent: (state, {payload: content}: PayloadAction<Content>) => {
      state.content = content
    },
    setAlertVisibility: (
      state,
      {payload: isVisible}: PayloadAction<boolean>,
    ) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      state.isVisible = isVisible
    },
    setAlertVariant: (state, {payload: variant}: PayloadAction<Variant>) => {
      state.variant = variant
    },
  },
})

export const {setAlertContent, setAlertVisibility, setAlertVariant} =
  alertSlice.actions

export const selectAlertContent = ({alert}: RootState) => alert.content
export const selectAlertVisibility = ({alert}: RootState) => alert.isVisible
export const selectAlertVariant = ({alert}: RootState) => alert.variant
