import {useCallback} from 'react'
import {PermissionStatus} from 'react-native-permissions'
import {getFcmToken, getPushNotificationPermission} from '@/processes/firebase'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services/deviceRegistration.service'

export const useRegisterDevice = (requestPermission = true) => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()
  const [unregisterDevice] = useUnregisterDeviceMutation()
  const {sendSentryErrorLog} = useSentry()

  const registerDevice = useCallback(
    ({status}: {status: PermissionStatus}) => {
      void getFcmToken(status)?.then(firebase_token => {
        void registerDeviceMutation({firebase_token})
      })
    },
    [registerDeviceMutation],
  )

  const registerDeviceWithPermission = useCallback(() => {
    getPushNotificationPermission(requestPermission)
      .then(registerDevice)
      .catch((error: unknown) => {
        sendSentryErrorLog(
          SentryErrorLogKey.registerDevice,
          'useRegisterDevice.ts',
          {
            error,
          },
        )
      })
  }, [registerDevice, sendSentryErrorLog, requestPermission])

  return {registerDeviceWithPermission, unregisterDevice}
}
