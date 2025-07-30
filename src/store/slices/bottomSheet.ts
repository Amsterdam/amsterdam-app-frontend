import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useEffect, useMemo} from 'react'
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

export const useBottomSheet = () => {
  const dispatch = useDispatch()
  const {close} = useMenu()
  const isOpen = useSelector(state => state[ReduxKey.bottomSheet].isOpen)
  const variant = useSelector(state => state[ReduxKey.bottomSheet].variant)

  useEffect(() => {
    if (isOpen) {
      close()
    }
  }, [close, isOpen])

  return {
    isOpen,
    ...useMemo(
      () => ({
        close: () => dispatch(closeBottomSheet()),
        open: (newVariant?: string) => {
          dispatch(openBottomSheet(newVariant))
        },
        toggle: (newVariant?: string) =>
          dispatch(toggleBottomSheet(newVariant)),
      }),
      [dispatch],
    ),
    variant,
  }
}
