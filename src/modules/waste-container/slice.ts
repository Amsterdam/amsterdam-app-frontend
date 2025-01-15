import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store/types/rootState'

export type OpenWasteContainerState = {
  hasWasteCard: boolean
}

const initialState: OpenWasteContainerState = {
  hasWasteCard: false,
}

export const wasteContainerSlice = createSlice({
  name: 'wasteContainerSlice',
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

export const {setHasWasteCard} = wasteContainerSlice.actions

export const selectHasWasteCard = (state: RootState) =>
  state.wasteContainer.hasWasteCard
