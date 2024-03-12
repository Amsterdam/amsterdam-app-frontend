import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type PermissionsState = {
  location: boolean
}

const initialState: PermissionsState = {
  location: false,
}

export const permissionsSlice = createSlice({
  name: ReduxKey.permissions,
  initialState,
  reducers: {
    setHasLocationPermission: (state, {payload}: PayloadAction<boolean>) => {
      state.location = payload
    },
  },
})

export const {setHasLocationPermission} = permissionsSlice.actions

export const selectHasLocationPermission = (state: RootState) =>
  state[ReduxKey.permissions].location

export const useHasLocationPermission = () =>
  useSelector(selectHasLocationPermission)
