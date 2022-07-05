import {useCallback} from 'react'
import {getFcmToken, Permission} from '@/processes'
import {useRegisterDeviceMutation} from '@/services'

export const useRegisterDevice = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()

  const registerDevice = useCallback(
    (status: Permission) => {
      getFcmToken(status)?.then(firebase_token => {
        firebase_token && registerDeviceMutation({firebase_token})
      })
    },
    [registerDeviceMutation],
  )

  return {registerDevice}
}
