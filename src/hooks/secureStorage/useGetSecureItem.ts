import {useEffect, useState} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

/**
 * Hook to get a secure item from the secure storage which will update when the secure item is updated.
 */
export const useGetSecureItem = (key: SecureItemKey) => {
  const [isLoading, setLoading] = useState(true)
  const [item, setItem] = useState<string | null>(null)
  const secureItemUpdatedTimestamp = useSelector(
    selectSecureItemUpdatedTimestamp(key),
  )

  useEffect(() => {
    getSecureItem(key)
      .then(secureItem => {
        setItem(secureItem)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [key, secureItemUpdatedTimestamp])

  return {item, isLoading}
}
