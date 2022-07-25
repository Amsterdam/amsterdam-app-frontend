import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LayoutAnimation} from 'react-native'
import {RootState} from '@/store'
import {CloseType, Variant} from '@/types'

type Content =
  | {
      title?: string
      text: string
    }
  | undefined

type AlertSliceState = {
  closeType?: CloseType
  content?: Content
  isVisible: boolean
  variant?: Variant
  withIcon?: boolean
}

const initialState: AlertSliceState = {
  closeType: CloseType.withoutButton,
  content: undefined,
  isVisible: false,
  variant: undefined,
  withIcon: false,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    resetAlert: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      return initialState
    },
    setAlert: (state, {payload: alert}: PayloadAction<AlertSliceState>) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      return {
        ...state,
        ...alert,
      }
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

export const {resetAlert, setAlert, setAlertVisibility} = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert
