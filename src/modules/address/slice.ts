import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address} from '@/modules/address/types'
import {RootState} from '@/store'

type AddressState = {
  address?: Address
}

export const addressSlice = createSlice({
  name: 'address',
  initialState: {} as AddressState,
  reducers: {
    addAddress: (state, {payload}: PayloadAction<Address>) => {
      state.address = payload
    },
    removeAddress: state => {
      state.address = undefined
    },
  },
})

export const {addAddress, removeAddress} = addressSlice.actions

export const selectAddress = (state: RootState) => state.address
