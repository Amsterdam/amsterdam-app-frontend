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
  closeType: AlertCloseType
  content: Content
  variant: AlertVariant
  withIcon: boolean
}

const initialState = {} as AlertSliceState

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    resetAlert: () => initialState,
    setAlert: (state, {payload}: PayloadAction<AlertSliceState>) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      return payload
    },
  },
})

export const {resetAlert, setAlert} = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert
