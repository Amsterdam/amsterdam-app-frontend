import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureAccessToken} from '@/modules/city-pass/hooks/useGetSecureAccessToken'
import {useLogoutMutation} from '@/modules/city-pass/service'
import {logout} from '@/modules/city-pass/utils/logout'

export const useLogout = () => {
  const {secureAccessToken} = useGetSecureAccessToken()
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()

  return useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!secureAccessToken) {
          logout('logoutSuccess', dispatch).then(resolve, reject)
        } else {
          logoutMutation()
            .unwrap()
            .then(() => {
              logout('logoutSuccess', dispatch).then(resolve, reject)
            })
            .catch(reject)
        }
      }),
    [secureAccessToken, dispatch, logoutMutation],
  )
}
