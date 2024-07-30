import {useMemo, useState} from 'react'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const useGetSecureItem = (key: SecureItemKey) => {
  const [isLoading, setLoading] = useState(true)
  const [item, setItem] = useState<string | null>(null)

  useMemo(() => {
    getSecureItem(key)
      .then(secureItem => {
        setItem(secureItem)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [key])

  return {item, isLoading}
}
