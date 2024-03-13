import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {AndroidPermission, IOSPermission} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

type Permission = AndroidPermission | IOSPermission

export type PermissionsState = Partial<Record<Permission, boolean>>

const initialState: PermissionsState = {}

export const permissionsSlice = createSlice({
  name: ReduxKey.permissions,
  initialState,
  reducers: {
    setPermission: (
      state,
      {
        payload: {permission, granted},
      }: PayloadAction<{granted: boolean; permission: Permission}>,
    ) => {
      state[permission] = granted
    },
  },
})

export const {setPermission} = permissionsSlice.actions

export const usePermission = (permission: Permission) => {
  const dispatch = useDispatch()
  const hasPermission =
    useSelector(
      (state: RootState) => state[ReduxKey.permissions][permission],
    ) ?? false
  const setHasPermission = useCallback(
    (granted: boolean) => dispatch(setPermission({permission, granted})),
    [dispatch, permission],
  )

  return {hasPermission, setHasPermission}
}
