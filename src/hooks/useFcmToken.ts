import messaging from '@react-native-firebase/messaging'
import {useEffect, useState} from 'react'

export const useFcmToken = () => {
  const [token, setToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  useEffect(() => {
    messaging()
      .getToken()
      .then(fcmToken => {
        setToken(fcmToken)
      })

    // Listen to whether the token changes
    return messaging().onTokenRefresh(fcmRefreshToken => {
      setRefreshToken(fcmRefreshToken)
    })
  }, [])
  return {token, refreshToken}
}
