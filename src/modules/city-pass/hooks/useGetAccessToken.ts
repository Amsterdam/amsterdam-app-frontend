import {useEffect} from 'react'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {useGetAccessTokenMutation} from '@/modules/city-pass/service'
import {SecureItemKey} from '@/utils/secureStorage'

export const useGetAccessToken = (getToken = true) => {
  const {item: secureAccessToken, isLoading} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )
  const setSecureItem = useSetSecureItem()

  const [getAccessToken, {data}] = useGetAccessTokenMutation()

  useEffect(() => {
    if (!isLoading && !secureAccessToken && getToken) {
      void getAccessToken()
    }
  }, [getAccessToken, getToken, isLoading, secureAccessToken])

  useEffect(() => {
    if (data) {
      const {access_token, refresh_token} = data

      void setSecureItem(SecureItemKey.cityPassAccessToken, access_token)
      void setSecureItem(SecureItemKey.cityPassRefreshToken, refresh_token)
    }
  }, [data, setSecureItem])

  return secureAccessToken
}
