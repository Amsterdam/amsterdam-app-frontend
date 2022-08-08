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
      // eslint-disable-next-line no-void
      void getFcmToken(status)?.then(firebase_token => {
        // eslint-disable-next-line no-void
        void registerDeviceMutation({firebase_token})
      })
    },
    [registerDeviceMutation],
  )

  return {registerDevice, unregisterDevice}
}
