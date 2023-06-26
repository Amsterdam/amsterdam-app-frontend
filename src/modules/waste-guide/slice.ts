import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Contract, WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {ReduxKey, RootState} from '@/store/types'

export type WasteGuideState = {
  contracts?: Contract
}

const initialState: WasteGuideState = {
  contracts: undefined,
}

export const wasteGuideSlice = createSlice({
  name: ReduxKey.wasteGuide,
  initialState,
  reducers: {
    addContract: (state, {payload}: PayloadAction<Contract>) => {
      state.contracts = {...state.contracts, ...payload}
    },
    resetContracts: () => initialState,
  },
})

export const {addContract, resetContracts} = wasteGuideSlice.actions

export const selectContracts = (state: RootState) =>
  state[ReduxKey.wasteGuide].contracts

export const selectContract = (
  bagNummeraanduidingId: WasteGuideResponseFraction['bagNummeraanduidingId'],
) =>
  createSelector(
    (state: RootState) => state[ReduxKey.wasteGuide].contracts,
    contracts => contracts?.[bagNummeraanduidingId],
  )
