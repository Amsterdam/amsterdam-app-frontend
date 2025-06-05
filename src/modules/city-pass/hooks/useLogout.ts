import {useCallback} from 'react'
import {useGetSecureAccessToken} from '@/modules/city-pass/hooks/useGetSecureAccessToken'
import {useLogoutMutation} from '@/modules/city-pass/service'
import {logout} from '@/modules/city-pass/utils/logout'

export const useLogout = () => {
  const {secureAccessToken} = useGetSecureAccessToken()
  const [logoutMutation] = useLogoutMutation()

  return useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!secureAccessToken) {
          logout('logoutSuccess').then(resolve, reject)
        } else {
          logoutMutation()
            .unwrap()
            .then(() => {
              logout('logoutSuccess').then(resolve, reject)
            })
            .catch(reject)
        }
      }),
    [secureAccessToken, logoutMutation],
  )
}
