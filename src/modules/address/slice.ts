/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {Address, LocationType} from '@/modules/address/types'
import {selectIsPermissionGranted} from '@/store/slices/permissions'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'
import {Permissions} from '@/types/permissions'

export type AddressState = {
  /**
   * User provided address, settable via the user profile
   */
  address?: Address
  /**
   * GPS provided address
   */
  location?: Address
  /**
   * user preference for using location or address
   */
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
    addLocation: (state, {payload: location}: PayloadAction<Address>) => ({
      ...state,
      location,
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

export const {addAddress, addLocation, removeAddress, setLocationType} =
  addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address].address

export const selectLocation = (state: RootState) =>
  state[ReduxKey.address].location

export const selectLocationType = (
  state: RootState,
): LocationType | undefined => {
  const locationType = state[ReduxKey.address].locationType
  const address = selectAddress(state)
  const hasLocationPermission = selectIsPermissionGranted(Permissions.location)(
    state,
  )

  // If location type is address and there is an address available, return address
  if (locationType === 'address' && address) {
    return 'address'
  }

  // If location type is location and location permission is granted, return location
  if (locationType === 'location' && hasLocationPermission) {
    return 'location'
  }

  // If address is set, return address
  if (address) {
    return 'address'
  }

  // If location permission is granted, return location
  if (hasLocationPermission) {
    return 'location'
  }

  // Otherwise, return address
  return undefined
}

export const useLocationType = () => useSelector(selectLocationType)
