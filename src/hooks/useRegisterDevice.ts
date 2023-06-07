import {useCallback} from 'react'
import {useSentry} from '@/hooks/useSentry'
import {
  getFcmToken,
  Permission,
  requestPushNotificationsPermission,
} from '@/processes'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services'

export const useRegisterDevice = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()
  const [unregisterDevice] = useUnregisterDeviceMutation()
  const {sendSentryErrorLog} = useSentry()

  const registerDevice = useCallback(
    (status: Permission) => {
      void getFcmToken(status)?.then(firebase_token => {
        void registerDeviceMutation({firebase_token})
      })
    },
    [registerDeviceMutation],
  )

  const registerDeviceWithPermission = useCallback(() => {
    requestPushNotificationsPermission()
      .then(registerDevice)
      .catch((error: unknown) => {
        sendSentryErrorLog(
          'Register device for push notifications failed',
          'useRegisterDevice.ts',
          {
            error,
          },
        )
      })
  }, [registerDevice, sendSentryErrorLog])

  return {registerDeviceWithPermission, unregisterDevice}
}
