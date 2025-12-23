import {createSlice} from '@reduxjs/toolkit'
import {type AddressFragmentState} from '@/modules/address/createAddressFragment'
import {moduleAddressFragments} from '@/modules/address/moduleAddressFragments'
import {ReduxKey} from '@/store/types/reduxKey'

const burningGuideFragment = moduleAddressFragments[ReduxKey.burningGuide]!

export type BurningGuideState = AddressFragmentState

const initialState: BurningGuideState = {}

export const burningGuideSlice = createSlice({
  name: ReduxKey.burningGuide,
  initialState,
  reducers: {
    ...burningGuideFragment.reducers,
  },
})

export const _ = burningGuideSlice.actions
