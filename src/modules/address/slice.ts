/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {Address, Coordinates, LocationType} from '@/modules/address/types'
import {selectIsPermissionGranted} from '@/store/slices/permissions'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'
import {Permissions} from '@/types/permissions'

export type AddressState = {
  address?: Address
  lastKnownCoordinates?: Coordinates
  locationType?: LocationType
}

const initialState: AddressState = {
  locationType: undefined,
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

export const selectLocationType = (state: RootState) => {
  const locationType = state[ReduxKey.address].locationType
  const address = selectAddress(state)

  // If location type is set and location type is not address and there's no address available, return it
  if (locationType && !(locationType === 'address' && !address)) {
    return locationType
  }

  // If address is set, return address
  if (address) {
    return 'address'
  }

  // If location permission is granted, return location
  if (selectIsPermissionGranted(Permissions.location)(state)) {
    return 'location'
  }

  // Otherwise, return address
  return 'address'
}

export const useLocationType = () => useSelector(selectLocationType)
