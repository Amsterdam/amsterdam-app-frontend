/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address, Coordinates, LocationType} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

type LocationTypePerModule = Partial<Record<ModuleSlug, LocationType>>

export type AddressState = {
  address?: Address
  lastKnownCoordinates?: Coordinates
  /**
   * We only know that the location is blocked (i.e. the user has not given permission when asked) when we catch it from the permission request. We store that status here so it is available throughout the app.
   */
  locationPermissionBlockedForAndroid?: boolean
  locationTypePerModule?: LocationTypePerModule
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
    addLastKnownCoordinates: (
      state,
      {payload: lastKnownCoordinates}: PayloadAction<Coordinates>,
    ) => ({
      ...state,
      lastKnownCoordinates,
    }),
    removeAddress: ({address, ...rest}) => rest,
    setLocationPermissionBlockedForAndroid: (
      state,
      {payload: locationPermissionBlockedForAndroid}: PayloadAction<boolean>,
    ) => ({
      ...state,
      locationPermissionBlockedForAndroid,
    }),
    setLocationType: (
      state,
      {
        payload: {slug, locationType},
      }: PayloadAction<{locationType: LocationType; slug: ModuleSlug}>,
    ) => ({
      ...state,
      locationTypePerModule: {
        ...state.locationTypePerModule,
        [slug]: locationType,
      },
    }),
  },
})

export const {
  addAddress,
  addLastKnownCoordinates,
  removeAddress,
  setLocationPermissionBlockedForAndroid,
  setLocationType,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address

export const selectLastKnownCoordinates = (state: RootState) =>
  state[ReduxKey.address]?.lastKnownCoordinates

export const selectLocationPermissionBlockedForAndroid = (state: RootState) =>
  state[ReduxKey.address]?.locationPermissionBlockedForAndroid

export const selectLocationTypePerModule = (state: RootState) =>
  state[ReduxKey.address]?.locationTypePerModule
