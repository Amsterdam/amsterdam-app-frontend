import {useCallback} from 'react'
import {getFcmToken, Permission} from '@/processes'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services'

export const useRegisterDevice = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()
  const [unregisterDevice] = useUnregisterDeviceMutation()

  const registerDevice = useCallback(
    (status: Permission) => {
      void getFcmToken(status)?.then(firebase_token => {
        void registerDeviceMutation({firebase_token})
      })
    },
    [registerDeviceMutation],
  )

  return {registerDevice, unregisterDevice}
}
