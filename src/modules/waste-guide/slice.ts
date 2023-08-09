/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Contract, WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

type LocationType = 'address' | 'location'

export type WasteGuideState = {
  contracts?: Contract
  locationType?: LocationType
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
    setLocationType: (state, {payload}: PayloadAction<LocationType>) => {
      state.locationType = payload
    },
    resetContracts: ({contracts, ...rest}) => rest,
  },
})

export const {addContract, setLocationType, resetContracts} =
  wasteGuideSlice.actions

export const selectContracts = (state: RootState) =>
  state[ReduxKey.wasteGuide].contracts

export const selectContract = (
  bagNummeraanduidingId: WasteGuideResponseFraction['bagNummeraanduidingId'],
) =>
  createSelector(
    (state: RootState) => state[ReduxKey.wasteGuide].contracts,
    contracts => contracts?.[bagNummeraanduidingId],
  )

export const selectLocationType = (state: RootState) =>
  state[ReduxKey.wasteGuide].locationType
