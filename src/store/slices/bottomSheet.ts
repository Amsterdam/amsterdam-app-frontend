import {createSlice} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
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
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state[ReduxKey.bottomSheet].isOpen)

  return {
    isOpen,
    ...useMemo(
      () => ({
        close: () => dispatch(closeBottomSheet()),
        open: () => dispatch(openBottomSheet()),
        toggle: () => dispatch(toggleBottomSheet()),
      }),
      [dispatch],
    ),
  }
}
