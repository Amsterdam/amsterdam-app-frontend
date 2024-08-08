import {useCallback} from 'react'
import {useSetSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {setSecureItem, SecureItemKey} from '@/utils/secureStorage'

/**
 * Hook to set a secure item in the secure storage and update the timestamp of the secure item in redux.
 */
export const useSetSecureItem = () => {
  const {setItem} = useSetSecureItemUpdatedTimestamp()

  return useCallback(
    (key: SecureItemKey, value: string) =>
      setSecureItem(key, value).then(() => {
        setItem(key)
      }),
    [setItem],
  )
}
