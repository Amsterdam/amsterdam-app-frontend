import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {config} from '@/modules/address/config'
import {
  Address,
  AddressState,
  HighAccuracyPurposeKey,
  LocationType,
} from '@/modules/address/types'
import {selectIsPermissionGranted} from '@/store/slices/permissions'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {Permissions} from '@/types/permissions'

const initialState: AddressState = {
  highAccuracyPurposeKey: HighAccuracyPurposeKey.PreciseLocationAddressLookup,
  locationType: undefined,
  locationFetchRequested: undefined,
  getLocationIsError: undefined,
  isGettingLocation: undefined,
  recentAddresses: [],
}

export const addressSlice = createSlice({
  name: ReduxKey.address,
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      address,
      recentAddresses: [
        address,
        ...state.recentAddresses.filter(a => a.bagId !== address.bagId),
      ].slice(0, config.maxRecentAddresses),
    }),
    addLocation: (state, {payload: location}: PayloadAction<Address>) => ({
      ...state,
      location,
      getLocationIsError: false,
    }),
    removeAddress: ({address: _address, ...rest}) => rest,
    resetRecentAddresses: state => ({
      ...state,
      recentAddresses: initialState.recentAddresses,
    }),
    requestLocationFetch: (
      state,
      {
        payload: highAccuracyPurposeKey,
      }: PayloadAction<HighAccuracyPurposeKey | undefined>,
    ) => ({
      ...state,
      highAccuracyPurposeKey:
        highAccuracyPurposeKey ?? initialState.highAccuracyPurposeKey,
      locationFetchRequested: true,
      getLocationIsError: false,
    }),
    setGetLocationIsError: (
      state,
      {payload: getLocationIsError}: PayloadAction<boolean>,
    ) => ({
      ...state,
      getLocationIsError,
      ...(getLocationIsError && {locationFetchRequested: false}),
    }),
    setIsGettingLocation: (
      state,
      {payload: isGettingLocation}: PayloadAction<boolean>,
    ) => ({
      ...state,
      isGettingLocation,
      ...(isGettingLocation && {
        locationFetchRequested: false,
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
  requestLocationFetch,
  resetRecentAddresses,
  setGetLocationIsError,
  setIsGettingLocation,
  setLocationType,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address].address

export const selectLocation = (state: RootState) =>
  state[ReduxKey.address].location

export const selectLocationFetchRequested = (state: RootState) =>
  state[ReduxKey.address].locationFetchRequested
export const selectGetLocationIsError = (state: RootState) =>
  state[ReduxKey.address].getLocationIsError

export const selectHighAccuracyPurposeKey = (state: RootState) =>
  state[ReduxKey.address].highAccuracyPurposeKey
export const selectIsGettingLocation = (state: RootState) =>
  state[ReduxKey.address].isGettingLocation

export const selectRecentAddresses = (state: RootState) =>
  state[ReduxKey.address].recentAddresses

export const useRecentAddresses = () => useSelector(selectRecentAddresses)

export const useAddress = () => useSelector(selectAddress)

export const useLocation = () => ({
  locationFetchRequested: useSelector(selectLocationFetchRequested),
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
