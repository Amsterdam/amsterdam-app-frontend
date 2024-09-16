import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type BottomSheetState = {
  isOpen: boolean
  isPresentAtRouteNames: string[]
}

export const bottomSheetSlice = createSlice({
  name: ReduxKey.bottomSheet,
  initialState: {
    isOpen: false,
    isPresentAtRouteNames: [],
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
    addIsPresentAtRouteName: (state, {payload}: PayloadAction<string>) => {
      state.isPresentAtRouteNames.push(payload)
    },
    removeIsPresentAtRouteName: (
      state,
      {payload: routeName}: PayloadAction<string>,
    ) => ({
      ...state,
      isPresentAtRouteNames: state.isPresentAtRouteNames.filter(
        name => name !== routeName,
      ),
    }),
    toggleBottomSheet: state => ({
      ...state,
      isOpen: !state.isOpen,
    }),
  },
})

export const {
  closeBottomSheet,
  openBottomSheet,
  addIsPresentAtRouteName,
  removeIsPresentAtRouteName,
  toggleBottomSheet,
} = bottomSheetSlice.actions

export const selectIsBottomSheetPresentRouteNames = (state: RootState) =>
  state[ReduxKey.bottomSheet].isPresentAtRouteNames

export const useBottomSheet = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state[ReduxKey.bottomSheet].isOpen)

  return {
    isOpen,
    ...useMemo(
      () => ({
        close: () => dispatch(closeBottomSheet()),
        open: () => dispatch(openBottomSheet()),
        addIsPresentAtRouteName: (routeName: string) =>
          dispatch(addIsPresentAtRouteName(routeName)),
        removeIsPresentAtRouteName: (routeName: string) =>
          dispatch(removeIsPresentAtRouteName(routeName)),
        toggle: () => dispatch(toggleBottomSheet()),
      }),
      [dispatch],
    ),
  }
}
