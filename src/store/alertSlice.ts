import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LayoutAnimation} from 'react-native'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {TestProps} from '@/components/ui/types'
import {isReduceMotionEnabled} from '@/hooks'
import {RootState} from '@/store/types'

export type Content =
  | {
      text: string
      title?: string
    }
  | undefined

export type AlertState = {
  closeType: AlertCloseType
  content: Content
  variant: AlertVariant
  withIcon: boolean
} & TestProps

const initialState = {} as AlertState

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    resetAlert: () => initialState,
    setAlert: (_state, {payload}: PayloadAction<AlertState>) => {
      if (!isReduceMotionEnabled) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      }
      return payload
    },
  },
})

export const {resetAlert, setAlert} = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert
