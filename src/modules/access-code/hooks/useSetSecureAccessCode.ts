import {useCallback} from 'react'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {SecureItemKey} from '@/utils/secureStorage'

export const useSetSecureAccessCode = () => {
  const setSecureItem = useSetSecureItem()

  return useCallback(
    (code: string) => {
      void setSecureItem(SecureItemKey.accessCode, code)
    },
    [setSecureItem],
  )
}
