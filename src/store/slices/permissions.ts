import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'
import {Permissions} from '@/utils/permissions/permissionsForPlatform'

export type PermissionsState = Partial<Record<Permissions, boolean>>

const initialState: PermissionsState = {}

export const permissionsSlice = createSlice({
  name: ReduxKey.permissions,
  initialState,
  reducers: {
    setPermission: (
      state,
      {
        payload: {permission, granted},
      }: PayloadAction<{granted: boolean; permission: Permissions}>,
    ) => {
      state[permission] = granted
    },
  },
})

export const {setPermission} = permissionsSlice.actions

export const selectIsPermissionGranted =
  (permission: Permissions) => (state: RootState) =>
    state[ReduxKey.permissions][permission] ?? false
