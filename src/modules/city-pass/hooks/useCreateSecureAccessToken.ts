import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {useGetAccessTokenMutation} from '@/modules/city-pass/service'
import {setTokenExpiration} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const useCreateSecureAccessToken = () => {
  const setSecureItem = useSetSecureItem()

  const [getAccessToken, {data}] = useGetAccessTokenMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      const {
        access_token,
        refresh_token,
        access_token_expiration,
        refresh_token_expiration,
      } = data

      void setSecureItem(SecureItemKey.cityPassAccessToken, access_token)
      void setSecureItem(SecureItemKey.cityPassRefreshToken, refresh_token)
      dispatch(
        setTokenExpiration({
          accessTokenExpiration: access_token_expiration,
          refreshTokenExpiration: refresh_token_expiration,
        }),
      )
    }
  }, [data, dispatch, setSecureItem])

  return getAccessToken
}
