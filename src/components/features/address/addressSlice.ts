import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {Address} from '../../../types'

type AddressState = {
  primary: Address
  temp: Address
}

export const addressSlice = createSlice({
  name: 'address',
  initialState: {primary: {}, temp: {}} as AddressState,
  reducers: {
    addAddress: (state, {payload}: PayloadAction<Address>) => {
      state.primary = payload
    },
    addTempAddress: (state, {payload}: PayloadAction<Address>) => {
      state.temp = payload
    },
  },
})

export const {addAddress, addTempAddress} = addressSlice.actions

export const selectAddress = (state: RootState) => state.address
