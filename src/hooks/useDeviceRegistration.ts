import {useCallback} from 'react'
import {getFcmToken} from '@/processes'
import {useRegisterDeviceMutation} from '@/services'

export const useDeviceRegistration = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()

  const deviceRegistration = useCallback(() => {
    getFcmToken().then(firebase_token => {
      firebase_token && registerDeviceMutation({firebase_token})
    })
  }, [registerDeviceMutation])

  return {deviceRegistration}
}
