/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address} from '@/modules/address/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type AddressState = {address?: Address; location?: Address}

const initialState: AddressState = {}

export const addressSlice = createSlice({
  name: ReduxKey.address,
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      address,
    }),
    addLocation: (state, {payload: location}: PayloadAction<Address>) => ({
      ...state,
      location,
    }),
    removeAddress: ({address, ...rest}) => rest,
    removeLocation: ({location, ...rest}) => rest,
  },
})

export const {addAddress, addLocation, removeAddress, removeLocation} =
  addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address

export const selectLocation = (state: RootState) =>
  state[ReduxKey.address]?.location
