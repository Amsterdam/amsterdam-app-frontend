import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useMenu} from '@/store/slices/menu'
import {ReduxKey} from '@/store/types/reduxKey'

export type BottomSheetState = {
  isOpen: boolean
  variant?: string
}

export const bottomSheetSlice = createSlice({
  name: ReduxKey.bottomSheet,
  initialState: {
    isOpen: false,
    variant: undefined,
  } as BottomSheetState,
  reducers: {
    closeBottomSheet: state => ({
      ...state,
      isOpen: false,
      variant: undefined,
    }),
    openBottomSheet: (state, {payload}: PayloadAction<string | undefined>) => ({
      ...state,
      isOpen: true,
      variant: payload,
    }),
    toggleBottomSheet: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => ({
      ...state,
      isOpen: !state.isOpen,
      variant: payload,
    }),
  },
})

export const {closeBottomSheet, openBottomSheet, toggleBottomSheet} =
  bottomSheetSlice.actions

export const useBottomSheetSelectors = () => {
  const isOpen = useSelector(state => state[ReduxKey.bottomSheet].isOpen)
  const variant = useSelector(state => state[ReduxKey.bottomSheet].variant)

  return {
    isOpen,
    variant,
  }
}

export const useBottomSheet = () => {
  const dispatch = useDispatch()
  const {close: closeMenu} = useMenu()

  return {
    ...useMemo(
      () => ({
        close: () => {
          dispatch(closeBottomSheet())
        },
        open: (newVariant?: string) => {
          closeMenu()
          dispatch(openBottomSheet(newVariant))
        },
        toggle: (newVariant?: string) => {
          closeMenu()
          dispatch(toggleBottomSheet(newVariant))
        },
      }),
      [closeMenu, dispatch],
    ),
  }
}
