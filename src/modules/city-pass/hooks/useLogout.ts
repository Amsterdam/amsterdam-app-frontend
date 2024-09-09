import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useLogoutMutation} from '@/modules/city-pass/service'
import {logout} from '@/modules/city-pass/utils/logout'
import {SecureItemKey} from '@/utils/secureStorage'

export const useLogout = () => {
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()

  return useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!secureAccessToken) {
          logout(false, dispatch).then(resolve, reject)
        } else {
          logoutMutation(secureAccessToken)
            .unwrap()
            .then(() => {
              logout(false, dispatch).then(resolve, reject)
            })
            .catch(reject)
        }
      }),
    [secureAccessToken, dispatch, logoutMutation],
  )
}
