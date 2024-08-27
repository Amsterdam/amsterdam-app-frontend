import {useCallback} from 'react'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {useLogoutMutation} from '@/modules/city-pass/service'
import {useSetCityPassOwnerIsRegistered} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const useLogout = () => {
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )
  const setCityPassRegistered = useSetCityPassOwnerIsRegistered()
  const removeSecureItems = useRemoveSecureItems()
  const [logout] = useLogoutMutation()

  return useCallback(
    () =>
      new Promise<void>((_resolve, reject) => {
        if (!secureAccessToken) {
          reject()

          return
        }

        logout(secureAccessToken)
          .unwrap()
          .then(() => {
            setCityPassRegistered(false)

            return removeSecureItems([
              SecureItemKey.cityPassAccessToken,
              SecureItemKey.cityPassRefreshToken,
              SecureItemKey.cityPasses,
            ])
          })
          .catch(() => reject())
      }),
    [logout, removeSecureItems, secureAccessToken, setCityPassRegistered],
  )
}
