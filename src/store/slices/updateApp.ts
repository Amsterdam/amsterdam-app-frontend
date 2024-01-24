import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type UpdateState = {
  lastSeenTimestamp?: number
}

export const updateAppSlice = createSlice({
  name: ReduxKey.updateApp,
  initialState: {},
  reducers: {
    setLastSeenTimestamp: (
      state,
      {payload: lastSeenTimestamp}: PayloadAction<number>,
    ) => ({
      ...state,
      lastSeenTimestamp,
    }),
  },
})

export const setLastSeenTimestamp = updateAppSlice.actions.setLastSeenTimestamp(
  Date.now(),
)

const selectLastSeenTimestamp = (state: RootState) =>
  state[ReduxKey.updateApp].lastSeenTimestamp

export const useLastSeenTimestamp = () => useSelector(selectLastSeenTimestamp)
