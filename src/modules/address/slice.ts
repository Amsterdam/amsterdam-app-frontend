/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address, Coordinates, LocationType} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

type LocationTypePerModule = Partial<Record<ModuleSlug, LocationType>>

export type AddressState = {
  address?: Address
  currentCoordinates?: Coordinates
  lastKnownCoordinates?: Coordinates
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
  addCurrentCoordinates,
  addLastKnownCoordinates,
  removeAddress,
  setLocationType,
} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address

export const selectCurrentCoordinates = (state: RootState) =>
  state[ReduxKey.address]?.currentCoordinates

export const selectLastKnownCoordinates = (state: RootState) =>
  state[ReduxKey.address]?.lastKnownCoordinates

export const selectLocationTypePerModule = (state: RootState) =>
  state[ReduxKey.address]?.locationTypePerModule
