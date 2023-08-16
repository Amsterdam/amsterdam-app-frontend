/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address} from '@/modules/address/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type AddressState = {
  address?: Address
  lastKnownLocationAddress?: Address
}

const initialState: AddressState = {}

export const addressSlice = createSlice({
  name: ReduxKey.address,
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      address,
    }),
    addLastKnownLocationAddress: (
      state,
      {payload: lastKnownLocationAddress}: PayloadAction<Address>,
    ) => ({
      ...state,
      lastKnownLocationAddress,
    }),
    removeAddress: ({address, ...rest}) => rest,
  },
})

export const {addAddress, addLastKnownLocationAddress, removeAddress} =
  addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address

export const selectLastKnownLocationAddress = (state: RootState) =>
  state[ReduxKey.address]?.lastKnownLocationAddress
