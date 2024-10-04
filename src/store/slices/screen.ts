import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ScreenState = {
  spaceBottom: number
}

const initialState = {
  spaceBottom: 0,
}

export const screenSlice = createSlice({
  name: ReduxKey.screen,
  initialState,
  reducers: {
    resetScreen: () => initialState,
    setExtraSpaceBottom: (state, {payload}: PayloadAction<number>) => {
      state.spaceBottom = payload
    },
  },
})

export const {setExtraSpaceBottom} = screenSlice.actions

export const selectScreenBottomExtraSpace = (state: RootState) =>
  state[ReduxKey.screen].spaceBottom

export const useScreen = () => {
  const dispatch = useDispatch()

  const spaceBottom = useSelector(selectScreenBottomExtraSpace)

  const setSpaceBottom = useCallback(
    (space: number) => dispatch(setExtraSpaceBottom(space)),
    [dispatch],
  )

  return {spaceBottom, setSpaceBottom}
}
