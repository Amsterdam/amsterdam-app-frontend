import {useCallback} from 'react'
import {useSentry} from '@/hooks/useSentry'
import {
  getFcmToken,
  getPushNotificationsPermission,
  Permission,
  requestPushNotificationsPermission,
} from '@/processes'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services'

export const useRegisterDevice = (askPermission = true) => {
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
    const permissionFn = askPermission
      ? requestPushNotificationsPermission
      : getPushNotificationsPermission

    permissionFn()
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
  }, [registerDevice, sendSentryErrorLog, askPermission])

  return {registerDeviceWithPermission, unregisterDevice}
}
