import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {useLogoutMutation} from '@/modules/city-pass/service'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const useLogout = () => {
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )
  const dispatch = useDispatch()
  const removeSecureItems = useRemoveSecureItems()
  const [logout] = useLogoutMutation()

  return useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!secureAccessToken) {
          reject()

          return
        }

        logout(secureAccessToken)
          .unwrap()
          .then(async () => {
            dispatch(setIsCityPassOwnerRegistered(false))

            await removeSecureItems([
              SecureItemKey.cityPassAccessToken,
              SecureItemKey.cityPassRefreshToken,
              SecureItemKey.cityPasses,
            ])
            resolve()
          })
          .catch(() => reject())
      }),
    [logout, removeSecureItems, secureAccessToken, dispatch],
  )
}
