import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type BottomSheetState = {
  isOpen: boolean
}

export const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState: {
    isOpen: false,
  } as BottomSheetState,
  reducers: {
    closeBottomSheet: state => ({
      ...state,
      isOpen: false,
    }),
    openBottomSheet: state => ({
      ...state,
      isOpen: true,
    }),
    toggleBottomSheet: state => ({
      ...state,
      isOpen: !state.isOpen,
    }),
  },
})

export const {closeBottomSheet, openBottomSheet, toggleBottomSheet} =
  bottomSheetSlice.actions

export const selectIsBottomSheetOpen = (state: RootState) =>
  state.bottomSheet.isOpen
