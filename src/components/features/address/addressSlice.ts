import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {Address} from '../../../types'

export const addressSlice = createSlice({
  name: 'address',
  initialState: {} as Address,
  reducers: {
    addAddress: (state, {payload}: PayloadAction<Address>) => (state = payload),
  },
})

export const {addAddress} = addressSlice.actions

export const selectAddress = (state: RootState) => state.address
