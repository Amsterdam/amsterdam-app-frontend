import {useCallback} from 'react'
import {useSetSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const useRemoveSecureItems = () => {
  const {deleteItem} = useSetSecureItemUpdatedTimestamp()

  return useCallback(
    (keys: SecureItemKey[]) =>
      removeSecureItems(keys).then(() => {
        keys.forEach(key => {
          deleteItem(key)
        })
      }),
    [deleteItem],
  )
}
