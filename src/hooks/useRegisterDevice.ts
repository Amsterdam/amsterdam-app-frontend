import {useCallback} from 'react'
import {PermissionStatus} from 'react-native-permissions'
import {useSentry} from '@/hooks/useSentry'
import {getFcmToken, getPushNotificationPermission} from '@/processes/firebase'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services'

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
          'Register device for push notifications failed',
          'useRegisterDevice.ts',
          {
            error,
          },
        )
      })
  }, [registerDevice, sendSentryErrorLog, requestPermission])

  return {registerDeviceWithPermission, unregisterDevice}
}
