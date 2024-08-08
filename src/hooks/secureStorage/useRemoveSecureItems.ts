import {useCallback} from 'react'
import {useSetSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const useRemoveSecureItems = () => {
  const {deleteItem} = useSetSecureItemUpdatedTimestamp()

  return useCallback(
    (keys: SecureItemKey[]) =>
      new Promise((resolve, reject) => {
        removeSecureItems(keys)
          .then(unresolvedKeys => {
            keys.forEach(key => {
              deleteItem(key)
            })
            resolve(unresolvedKeys)
          })
          .catch(reject)
      }),
    [deleteItem],
  )
}
