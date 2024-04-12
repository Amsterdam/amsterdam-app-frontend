import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  Address,
  AddressState,
  HighAccuracyPurposeKey,
  LocationType,
} from '@/modules/address/types'
import {selectIsPermissionGranted} from '@/store/slices/permissions'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'
import {Permissions} from '@/types/permissions'

const initialState: AddressState = {
  highAccuracyPurposeKey: HighAccuracyPurposeKey.PreciseLocationAddressLookup,
  locationType: undefined,
  startGettingLocation: undefined,
  getLocationIsError: undefined,
  isGettingLocation: undefined,
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
      getLocationIsError: false,
    }),
    removeAddress: ({address: _address, ...rest}) => rest,
    setStartGettingLocation: (
      state,
      {
        payload,
      }: PayloadAction<
        {highAccuracyPurposeKey: HighAccuracyPurposeKey} | undefined
      >,
    ) => ({
      ...state,
      highAccuracyPurposeKey:
        payload?.highAccuracyPurposeKey ?? initialState.highAccuracyPurposeKey,
      startGettingLocation: true,
      getLocationIsError: false,
    }),
    setGetLocationIsError: (
      state,
      {payload: getLocationIsError}: PayloadAction<boolean>,
    ) => ({
      ...state,
      getLocationIsError,
      ...(getLocationIsError && {startGettingLocation: false}),
    }),
    setIsGettingLocation: (
      state,
      {payload: isGettingLocation}: PayloadAction<boolean>,
    ) => ({
      ...state,
      isGettingLocation,
      ...(isGettingLocation && {
        startGettingLocation: false,
        getLocationIsError: false,
      }),
    }),
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
  addLocation,
  removeAddress,
  setStartGettingLocation,
  setGetLocationIsError,
  setIsGettingLocation,
  setLocationType,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address].address

export const selectLocation = (state: RootState) =>
  state[ReduxKey.address].location

export const selectStartGettingLocation = (state: RootState) =>
  state[ReduxKey.address].startGettingLocation
export const selectGetLocationIsError = (state: RootState) =>
  state[ReduxKey.address].getLocationIsError

export const selectHighAccuracyPurposeKey = (state: RootState) =>
  state[ReduxKey.address].highAccuracyPurposeKey
export const selectIsGettingLocation = (state: RootState) =>
  state[ReduxKey.address].isGettingLocation

export const useLocation = () => ({
  startGettingLocation: useSelector(selectStartGettingLocation),
  getLocationIsError: useSelector(selectGetLocationIsError),
  highAccuracyPurposeKey: useSelector(selectHighAccuracyPurposeKey),
  isGettingLocation: useSelector(selectIsGettingLocation),
  location: useSelector(selectLocation),
})

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
