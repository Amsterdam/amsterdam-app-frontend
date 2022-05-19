import messaging from '@react-native-firebase/messaging'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'
import {getSubscribedProjects} from '../components/features/settings/'
import {useEnvironment} from '../store'
import {DeviceRegistration, NotificationSettings, Settings} from '../types'
import {getFcmToken, mapPermissionStatus, Permission} from '../utils'
import {getAuthToken} from '../utils'
import {useFetch} from './useFetch'

export const useDeviceRegistration = (settings: Settings | undefined) => {
  const [refreshToken, setRefreshToken] = useState<string | undefined>()

  const subscribedProjects = getSubscribedProjects(
    settings?.notifications?.projects,
  )

  const authToken = getAuthToken(process.env.AUTH_SHARED_SECRET)

  const environment = useEnvironment()

  const registerDevice = useFetch<DeviceRegistration>({
    url: environment.apiUrl + '/device_registration',
    options: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        DeviceAuthorization: authToken,
      }),
    },
    onLoad: false,
  })

  const patchApi = useFetch<DeviceRegistration>({
    url: environment.apiUrl + '/device_registration',
    options: {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        DeviceAuthorization: authToken,
      }),
    },
    onLoad: false,
  })

  const prevNotificationSettings = useRef<NotificationSettings | undefined>(
    settings?.notifications,
  )

  const shouldRegisterDevice = useCallback(() => {
    // if no projects are subscribed to, only register to backend if previously there were
    if (!subscribedProjects.length) {
      const prevSubscribedProjects = getSubscribedProjects(
        prevNotificationSettings.current?.projects ?? {},
      ).length

      return prevSubscribedProjects
    }

    return true
  }, [subscribedProjects.length])

  const register = useCallback(async () => {
    if (!shouldRegisterDevice()) {
      return
    }

    try {
      const token = await getFcmToken()

      if (!token) {
        return
      }

      await registerDevice.fetchData(
        {},
        JSON.stringify({
          device_token: token,
          os_type: Platform.OS,
          projects: subscribedProjects,
        }),
      )

      prevNotificationSettings.current = settings?.notifications

      return registerDevice.hasError
    } catch (error) {
      console.log(error)
    }
  }, [settings?.notifications, shouldRegisterDevice]) // eslint-disable-line react-hooks/exhaustive-deps

  const registerWithRefreshToken = useCallback(
    async () => {
      try {
        const token = await getFcmToken()

        await patchApi.fetchData(
          {},
          JSON.stringify({
            device_token: token,
            device_refresh_token: refreshToken,
            os_type: Platform.OS,
            projects: subscribedProjects,
          }),
        )

        return patchApi.hasError
      } catch (error) {
        console.log(error)
      }
    },
    [refreshToken], // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    // Listen to whether the token changes
    messaging()
      .hasPermission()
      .then(status => {
        if (mapPermissionStatus(status) === Permission.Granted) {
          return messaging().onTokenRefresh(token => {
            setRefreshToken(token)
          })
        }
      })
  }, [])

  useEffect(() => {
    refreshToken && registerWithRefreshToken()
  }, [refreshToken, registerWithRefreshToken])

  return {register}
}
