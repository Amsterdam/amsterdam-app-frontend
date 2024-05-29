import messaging from '@react-native-firebase/messaging'
import {useCallback} from 'react'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services/deviceRegistration.service'
import {Permissions} from '@/types/permissions'

export const useRegisterDevice = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()
  const [unregisterDevice] = useUnregisterDeviceMutation()
  const {sendSentryErrorLog} = useSentry()
  const {hasPermission, requestPermission} = usePermission(
    Permissions.notifications,
  )

  const registerDevice = useCallback(() => {
    messaging()
      .getToken()
      .then(firebase_token => {
        void registerDeviceMutation({firebase_token})
      })
      .catch((error: unknown) => {
        sendSentryErrorLog(
          SentryErrorLogKey.registerDevice,
          'useRegisterDevice.ts',
          {
            error,
          },
        )
      })
  }, [registerDeviceMutation, sendSentryErrorLog])

  const registerDeviceIfPermitted = useCallback(
    (requestNotificationPermission = false) =>
      new Promise<boolean>((resolve, _reject) => {
        if (requestNotificationPermission) {
          void requestPermission().then(granted => {
            granted && registerDevice()

            resolve(granted)
          })
        } else {
          hasPermission && registerDevice()

          resolve(hasPermission)
        }
      }),
    [requestPermission, registerDevice, hasPermission],
  )

  return {
    /**
     * Promise resolves to true if permission is granted, false otherwise
     */
    registerDeviceIfPermitted,
    unregisterDevice,
  }
}
