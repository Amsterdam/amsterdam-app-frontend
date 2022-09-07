import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import {Address} from '@/types'

type AddressState = {
  primary?: Address
  temp?: Address
}

export const addressSlice = createSlice({
  name: 'address',
  initialState: {} as AddressState,
  reducers: {
    addAddress: (state, {payload}: PayloadAction<Address>) => {
      state.primary = payload
    },
    addTempAddress: (state, {payload}: PayloadAction<Address>) => {
      state.temp = payload
    },
    removePrimaryAddress: state => {
      state.primary = undefined
    },
  },
})

export const {addAddress, addTempAddress, removePrimaryAddress} =
  addressSlice.actions

export const selectAddress = (state: RootState) => state.address
