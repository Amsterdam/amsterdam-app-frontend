import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address} from '@/modules/address/types'
import {RootState} from '@/store'

const initialState = {} as Address

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, {payload}: PayloadAction<Address>) => payload,
    removeAddress: () => initialState,
  },
})

export const {addAddress, removeAddress} = addressSlice.actions

export const selectAddress = (state: RootState) => state.address
