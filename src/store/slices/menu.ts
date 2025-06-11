import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MenuState = {
  isMenuVisible: boolean
}

const initialState: MenuState = {
  isMenuVisible: false,
}

export const menuSlice = createSlice({
  name: ReduxKey.menu,
  initialState,
  reducers: {
    setIsMenuVisible: (state, {payload}: PayloadAction<boolean>) => {
      state.isMenuVisible = payload
    },
  },
})

export const {setIsMenuVisible} = menuSlice.actions

export const selectIsMenuVisible = (state: RootState) =>
  state[ReduxKey.menu].isMenuVisible
