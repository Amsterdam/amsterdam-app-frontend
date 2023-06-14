import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address} from '@/modules/address/types'
import {RootState} from '@/store'

export type AddressState = {address?: Address}

const initialState: AddressState = {}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => {
      address
    },
    removeAddress: () => initialState,
  },
})

export const {addAddress, removeAddress} = addressSlice.actions

export const selectAddress = (state: RootState) => state.address.address
