import {createSlice} from '@reduxjs/toolkit'
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {ReduxKey} from '@/store/types/reduxKey'

export type BottomSheetState = {
  isOpen: boolean
}

export const bottomSheetSlice = createSlice({
  name: ReduxKey.bottomSheet,
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

export const useBottomSheet = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state[ReduxKey.bottomSheet].isOpen)

  return {
    close: () => dispatch(closeBottomSheet()),
    isOpen,
    open: () => dispatch(openBottomSheet()),
    toggle: () => dispatch(toggleBottomSheet()),
  }
}
