import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LayoutAnimation} from 'react-native'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {RootState} from '@/store'

export type Content =
  | {
      title?: string
      text: string
    }
  | undefined

export type AlertSliceState = {
  closeType?: AlertCloseType
  content?: Content
  isVisible: boolean
  variant?: AlertVariant
  withIcon?: boolean
}

const initialState: AlertSliceState = {
  closeType: AlertCloseType.withoutButton,
  content: undefined,
  isVisible: false,
  variant: AlertVariant.default,
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
