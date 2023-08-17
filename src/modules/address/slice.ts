/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address, Coordinates} from '@/modules/address/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type AddressState = {
  address?: Address
  currentCoordinates?: Coordinates
  lastKnownCoordinates?: Coordinates
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
    addCurrentCoordinates: (
      state,
      {payload: currentCoordinates}: PayloadAction<Coordinates>,
    ) => ({
      ...state,
      currentCoordinates,
    }),
    addLastKnownCoordinates: (
      state,
      {payload: lastKnownCoordinates}: PayloadAction<Coordinates>,
    ) => ({
      ...state,
      lastKnownCoordinates,
    }),
    removeAddress: ({address, ...rest}) => rest,
  },
})

export const {
  addAddress,
  addCurrentCoordinates,
  addLastKnownCoordinates,
  removeAddress,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address

export const selectCurrentCoordinates = (state: RootState) =>
  state[ReduxKey.address]?.currentCoordinates

export const selectLastKnownCoordinates = (state: RootState) =>
  state[ReduxKey.address]?.lastKnownCoordinates
