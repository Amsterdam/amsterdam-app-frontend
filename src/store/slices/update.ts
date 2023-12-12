import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type UpdateState = {
  lastSeenTimestamp?: number
}

export const updateSlice = createSlice({
  name: ReduxKey.update,
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

export const {setLastSeenTimestamp} = updateSlice.actions

const selectLastSeenTimestamp = (state: RootState) =>
  state[ReduxKey.update].lastSeenTimestamp

export const useLastSeenTimestamp = () => useSelector(selectLastSeenTimestamp)
