/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Contract} from '@/modules/waste-guide/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

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
    resetContracts: ({contracts, ...rest}) => rest,
  },
})

export const {addContract, resetContracts} = wasteGuideSlice.actions

export const selectContracts = (state: RootState) =>
  state[ReduxKey.wasteGuide].contracts

export const selectContract = (bagNummeraanduidingId: string) =>
  createSelector(
    (state: RootState) => state[ReduxKey.wasteGuide].contracts,
    contracts => contracts?.[bagNummeraanduidingId],
  )
