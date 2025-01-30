import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type WasteContainerState = {
  isMenuVisible: boolean
}

const initialState: WasteContainerState = {
  isMenuVisible: false,
}

export const wasteContainerSlice = createSlice({
  name: ReduxKey.wasteContainer,
  initialState,
  reducers: {
    setIsMenuVisible: (state, {payload}: PayloadAction<boolean>) => {
      state.isMenuVisible = payload
    },
  },
})

export const {setIsMenuVisible} = wasteContainerSlice.actions

export const selectIsMenuVisible = (state: RootState) =>
  state[ReduxKey.wasteContainer].isMenuVisible
