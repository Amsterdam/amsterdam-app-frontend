import {useEffect} from 'react'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {useGetAccessTokenMutation} from '@/modules/city-pass/service'
import {SecureItemKey} from '@/utils/secureStorage'

export const useCreateSecureAccessToken = () => {
  const setSecureItem = useSetSecureItem()

  const [getAccessToken, {data}] = useGetAccessTokenMutation()

  useEffect(() => {
    if (data) {
      const {access_token, refresh_token} = data

      void setSecureItem(SecureItemKey.cityPassAccessToken, access_token)
      void setSecureItem(SecureItemKey.cityPassRefreshToken, refresh_token)
    }
  }, [data, setSecureItem])

  return {getAccessToken}
}
