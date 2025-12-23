import {createAction, PayloadAction} from '@reduxjs/toolkit'
import type {Address, LocationType} from '@/modules/address/types'
import type {ReduxKey} from '@/store/types/reduxKey'

export type AddressFragmentState = {
  address?: Address
  locationType?: LocationType
}

/**
 * A factory function to easily enable module specific address functionality inside module slices.
 * @param key ReduxKey for which to create an module specific address slice fragment.
 * @returns Address reducer to spread into the module slice.
 */
export const createAddressFragment = (key: ReduxKey) => {
  const addAddress = createAction<Address>(`${key}/addAddress`)
  const removeAddress = createAction(`${key}/removeAddress`)
  const setLocationType = createAction<{locationType: LocationType}>(
    `${key}/setLocationType`,
  )

  const reducers = {
    addAddress: (
      state: AddressFragmentState,
      action: PayloadAction<Address>,
    ) => {
      state.address = action.payload
    },
    removeAddress: (state: AddressFragmentState) => {
      state.address = undefined
    },
    setLocationType: (
      state: AddressFragmentState,
      action: PayloadAction<{locationType: LocationType}>,
    ) => {
      state.locationType = action.payload.locationType
    },
  }

  return {
    reducers,
    actions: {
      addAddress,
      removeAddress,
      setLocationType,
    },
  }
}
