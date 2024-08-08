import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'
import {SecureItemKey} from '@/utils/secureStorage'

export type SecureStorageState = Record<SecureItemKey, number | undefined>

export const secureStorageSlice = createSlice({
  name: ReduxKey.secureStorage,
  initialState: {} as SecureStorageState,
  reducers: {
    setSecureItemUpatedTimestamp: (
      state,
      {payload}: PayloadAction<SecureItemKey>,
    ) => {
      Object.assign(state, {[payload]: Date.now()})
    },
    deleteSecureItemUpdatedTimestamp: (
      state,
      {payload}: PayloadAction<SecureItemKey>,
    ) => {
      if (state[payload]) {
        delete state[payload]
      }
    },
  },
})

export const {deleteSecureItemUpdatedTimestamp, setSecureItemUpatedTimestamp} =
  secureStorageSlice.actions

export const selectSecureItemUpdatedTimestamp =
  (key: SecureItemKey) => (state: RootState) =>
    state[ReduxKey.secureStorage][key]

export const useSetSecureItemUpdatedTimestamp = () => {
  const dispatch = useDispatch()

  const deleteItem = useCallback(
    (key: SecureItemKey) => dispatch(deleteSecureItemUpdatedTimestamp(key)),
    [dispatch],
  )
  const setItem = useCallback(
    (key: SecureItemKey) => dispatch(setSecureItemUpatedTimestamp(key)),
    [dispatch],
  )

  return {deleteItem, setItem}
}
