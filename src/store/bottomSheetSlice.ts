import {createSlice, PayloadAction} from '@reduxjs/toolkit'
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
    setBottomSheetIsExpanded: (
      state,
      {payload: isExpanded}: PayloadAction<boolean>,
    ) => ({
      ...state,
      isExpanded,
    }),
    toggleBottomSheetIsExpanded: state => ({
      ...state,
      isExpanded: !state.isExpanded,
    }),
  },
})

export const {setBottomSheetIsExpanded, toggleBottomSheetIsExpanded} =
  bottomSheetSlice.actions

export const selectBottomSheetIsExpanded = (state: RootState) =>
  state.bottomSheet.isExpanded
