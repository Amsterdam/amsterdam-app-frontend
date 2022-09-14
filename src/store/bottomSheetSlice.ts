import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type BottomSheetState = {
  isExpanded: boolean
}

export const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState: {
    isExpanded: false,
  } as BottomSheetState,
  reducers: {
    closeBottomSheet: state => ({
      ...state,
      isExpanded: false,
    }),
    expandBottomSheet: state => ({
      ...state,
      isExpanded: true,
    }),
    toggleBottomSheet: state => ({
      ...state,
      isExpanded: !state.isExpanded,
    }),
  },
})

export const {closeBottomSheet, expandBottomSheet, toggleBottomSheet} =
  bottomSheetSlice.actions

export const selectIsBottomSheetExpanded = (state: RootState) =>
  state.bottomSheet.isExpanded
