import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {AddressFragmentState} from '@/modules/address/createAddressFragment'
import {useSelector} from '@/hooks/redux/useSelector'
import {moduleAddressFragments} from '@/modules/address/moduleAddressFragments'
import {PollingStation} from '@/modules/elections/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ElectionsState = {
  selectedPollingStationId?: PollingStation['id']
} & AddressFragmentState

const electionsAddressFragment = moduleAddressFragments[ReduxKey.elections]!

const initialState: ElectionsState = {
  selectedPollingStationId: undefined,
}

export const electionsSlice = createSlice({
  name: ReduxKey.elections,
  initialState,
  reducers: {
    ...electionsAddressFragment.reducers,
    setSelectedPollingStationId: (
      state,
      {payload: id}: PayloadAction<PollingStation['id']>,
    ) => {
      state.selectedPollingStationId = id
    },
    resetSelectedPollingStationId: state => {
      state.selectedPollingStationId = undefined
    },
  },
})

export const {setSelectedPollingStationId, resetSelectedPollingStationId} =
  electionsSlice.actions

export const selectSelectedPollingStationId = (state: RootState) =>
  state[ReduxKey.elections].selectedPollingStationId

export const useSelectedPollingStationId = () =>
  useSelector(selectSelectedPollingStationId)
