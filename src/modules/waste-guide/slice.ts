import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {Contract} from '@/modules/waste-guide/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type WasteGuideState = {
  calendarView: 'list' | 'calendar'
  contracts?: Contract
}

const initialState: WasteGuideState = {
  calendarView: 'calendar',
  contracts: undefined,
}

export const wasteGuideSlice = createSlice({
  name: ReduxKey.wasteGuide,
  initialState,
  reducers: {
    addContract: (state, {payload}: PayloadAction<Contract>) => {
      state.contracts = state.contracts
        ? {...state.contracts, ...payload}
        : payload
    },
    resetContracts: ({contracts: _contracts, ...rest}) => rest,
    toggleCalendarView: state => {
      state.calendarView = state.calendarView === 'list' ? 'calendar' : 'list'
    },
  },
})

export const {addContract, resetContracts} = wasteGuideSlice.actions

export const selectContracts = (state: RootState) =>
  state[ReduxKey.wasteGuide].contracts

export const selectContract =
  (bagNummeraanduidingId?: string) => (state: RootState) => {
    if (!bagNummeraanduidingId) {
      return undefined
    }

    return state[ReduxKey.wasteGuide].contracts?.[bagNummeraanduidingId]
  }

export const useCalendarView = () => {
  const dispatch = useDispatch()
  const calendarView = useSelector(
    (state: RootState) => state[ReduxKey.wasteGuide].calendarView,
  )
  const toggleCalendarView = () => {
    dispatch(wasteGuideSlice.actions.toggleCalendarView())
  }

  return {calendarView, toggleCalendarView}
}
