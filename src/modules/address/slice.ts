/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {Address, Coordinates, LocationType} from '@/modules/address/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type AddressState = {
  address?: Address
  lastKnownCoordinates?: Coordinates
  locationType: LocationType
}

const initialState: AddressState = {
  locationType: 'address',
}

export const addressSlice = createSlice({
  name: ReduxKey.address,
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      address,
    }),
    addLastKnownCoordinates: (
      state,
      {payload: lastKnownCoordinates}: PayloadAction<Coordinates>,
    ) => ({
      ...state,
      lastKnownCoordinates,
    }),
    removeAddress: ({address, ...rest}) => rest,
    setLocationType: (
      state,
      {payload: {locationType}}: PayloadAction<{locationType: LocationType}>,
    ) => ({
      ...state,
      locationType,
    }),
  },
})

export const {
  addAddress,
  addLastKnownCoordinates,
  removeAddress,
  setLocationType,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address].address

export const selectLastKnownCoordinates = (state: RootState) =>
  state[ReduxKey.address].lastKnownCoordinates

export const selectLocationType = (state: RootState) =>
  state[ReduxKey.address].locationType

export const useLocationType = () => useSelector(selectLocationType)
