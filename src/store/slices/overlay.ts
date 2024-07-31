import {createSlice} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'

export type OverlayState = {
  isOpen: boolean
}

export const overlaySlice = createSlice({
  name: ReduxKey.overlay,
  initialState: {
    isOpen: false,
  } as OverlayState,
  reducers: {
    closeOverlay: state => {
      state.isOpen = false
    },
    openOverlay: state => {
      state.isOpen = true
    },
    toggleOverlay: state => {
      state.isOpen = !state.isOpen
    },
  },
})

export const {closeOverlay, openOverlay, toggleOverlay} = overlaySlice.actions

export const useOverlay = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state[ReduxKey.overlay].isOpen)

  return {
    isOpen,
    ...useMemo(
      () => ({
        close: () => dispatch(closeOverlay()),
        open: () => dispatch(openOverlay()),
        toggle: () => dispatch(toggleOverlay()),
      }),
      [dispatch],
    ),
  }
}
