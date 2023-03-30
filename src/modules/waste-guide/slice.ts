import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Contract} from '@/modules/waste-guide/types'
import {RootState} from '@/store'

type WasteGuideState = {
  contract?: Contract
}

const initialState: WasteGuideState = {
  contract: undefined,
}

export const wasteGuideSlice = createSlice({
  name: 'wasteGuide',
  initialState,
  reducers: {
    setContract: (state, action: PayloadAction<Contract>) => {
      state.contract = action.payload
    },
  },
})

export const {setContract} = wasteGuideSlice.actions

export const selectContract = (state: RootState) => state.wasteGuide.contract
