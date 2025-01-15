import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store/types/rootState'

export type OpenWasteContainerState = {
  hasWasteCard: boolean
}

const initialState: OpenWasteContainerState = {
  hasWasteCard: false,
}

export const openWasteContainerSlice = createSlice({
  name: 'openWasteContainerSlice',
  initialState,
  reducers: {
    setHasWasteCard: (
      state,
      {payload: hasWasteCard}: PayloadAction<boolean>,
    ) => {
      state.hasWasteCard = hasWasteCard
    },
  },
})

export const {setHasWasteCard} = openWasteContainerSlice.actions

export const selectHasWasteCard = (state: RootState) =>
  state.openWasteContainer.hasWasteCard
