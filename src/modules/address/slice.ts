/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {Address, Coordinates, LocationType} from '@/modules/address/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type AddressState = {
  address?: Address
  lastKnownCoordinates?: Coordinates
  locationType?: LocationType
  /**
   * We only know that the location is blocked or denied (i.e. the user has not given permission when asked) when we catch it from the permission request. We store that status here so it is available throughout the app.
   */
  noLocationPermissionForAndroid?: boolean
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
    setNoLocationPermissionForAndroid: (
      state,
      {payload: noLocationPermissionForAndroid}: PayloadAction<boolean>,
    ) => ({
      ...state,
      noLocationPermissionForAndroid,
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
  addLastKnownCoordinates,
  removeAddress,
  setNoLocationPermissionForAndroid,
  setLocationType,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address

export const selectLastKnownCoordinates = (state: RootState) =>
  state[ReduxKey.address]?.lastKnownCoordinates

export const selectNoLocationPermissionForAndroid = (state: RootState) =>
  state[ReduxKey.address]?.noLocationPermissionForAndroid

export const selectLocationType = (state: RootState) =>
  state[ReduxKey.address]?.locationType

export const useNoLocationPermissionForAndroid = () =>
  useSelector(
    (state: RootState) =>
      state[ReduxKey.address]?.noLocationPermissionForAndroid,
  )
