import messaging from '@react-native-firebase/messaging'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'
import {getSubscribedProjects} from '../components/features/settings/'
import {getEnvironment} from '../environment'
import {DeviceRegistration, NotificationSettings, Settings} from '../types'
import {
  encryptWithAES,
  getFcmToken,
  mapPermissionStatus,
  Permission,
} from '../utils'
import {useFetch} from './useFetch'

export const useDeviceRegistration = (settings: Settings | undefined) => {
  const [refreshToken, setRefreshToken] = useState<string | undefined>()

  const subscribedProjects = getSubscribedProjects(
    settings?.notifications?.projects,
  )

  // TODO Set as environment variables in CI/CD pipeline
  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: '44755871-9ea6-4018-b1df-e4f00466c723',
  })

  const storeApi = useFetch<DeviceRegistration>({
    url: getEnvironment().apiUrl + '/device_registration',
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
    url: getEnvironment().apiUrl + '/device_registration',
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

  const storeDeviceIfNeeded = useCallback(() => {
    // if no projects are subscribed to, only store if previously there were
    if (!subscribedProjects.length) {
      const prevSubscribedProjects = getSubscribedProjects(
        prevNotificationSettings.current?.projects ?? {},
      ).length

      return prevSubscribedProjects
    }

    return true
  }, [subscribedProjects.length])

  const store = useCallback(async () => {
    if (!storeDeviceIfNeeded()) {
      return
    }

    try {
      const token = await getFcmToken()

      await storeApi.fetchData(
        {},
        JSON.stringify({
          device_token: token,
          os_type: Platform.OS,
          projects: subscribedProjects,
        }),
      )

      prevNotificationSettings.current = settings?.notifications

      return storeApi.hasError
    } catch (error) {
      console.log(error)
    }
  }, [settings?.notifications, storeDeviceIfNeeded]) // eslint-disable-line react-hooks/exhaustive-deps

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

  return {store}
}
