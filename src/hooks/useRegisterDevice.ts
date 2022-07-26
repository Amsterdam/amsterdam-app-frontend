import {useCallback} from 'react'
import {getFcmToken, Permission} from '@/processes'
import {useRegisterDeviceMutation} from '@/services'

export const useRegisterDevice = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()

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

  return {registerDevice}
}
