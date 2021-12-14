import messaging from '@react-native-firebase/messaging'
import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'
import {getEnvironment} from '../environment'
import {SettingsContext} from '../providers/settings.provider'
import {
  DeviceRegistration,
  NotificationSettings,
  SubscribedProjects,
} from '../types'
import {encryptWithAES, getFcmToken} from '../utils'
import {useFetch} from './useFetch'

export const useDeviceRegistration = () => {
  const {settings} = useContext(SettingsContext)
  const [refreshToken, setRefreshToken] = useState<string | undefined>()

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

  const onlySubscribedProjects = (projects: SubscribedProjects): string[] =>
    Object.entries(projects).reduce((acc, val) => {
      // @ts-ignore
      val[1] && acc.push(val[0])
      return acc
    }, [])

  const storeDeviceIfNeeded = useCallback(() => {
    const hasSubscribedProjects = onlySubscribedProjects(
      settings?.notifications?.projects ?? {},
    ).length

    // if no projects are subscribed to, only store if previously there were
    if (!hasSubscribedProjects) {
      const prevSubscribedProjects = onlySubscribedProjects(
        prevNotificationSettings.current?.projects ?? {},
      ).length
      return prevSubscribedProjects
    }

    return true
  }, [settings?.notifications])

  const store = useCallback(async () => {
    if (!storeDeviceIfNeeded()) {
      return
    }
    const projectsInSettings = settings?.notifications?.projects
    try {
      const token = await getFcmToken()

      await storeApi.fetchData(
        {},
        JSON.stringify({
          device_token: token,
          os_type: Platform.OS,
          projects: projectsInSettings
            ? onlySubscribedProjects(projectsInSettings)
            : [],
        }),
      )

      return storeApi.hasError
    } catch (error) {
      console.log(error)
    }
  }, [settings?.notifications, storeDeviceIfNeeded]) // eslint-disable-line react-hooks/exhaustive-deps

  const registerWithRefreshToken = useCallback(
    async () => {
      const projectsInSettings = settings?.notifications?.projects
      try {
        const token = await getFcmToken()

        await patchApi.fetchData(
          {},
          JSON.stringify({
            device_token: token,
            device_refresh_token: refreshToken,
            os_type: Platform.OS,
            projects: projectsInSettings
              ? onlySubscribedProjects(projectsInSettings)
              : [],
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
    // prevent calling store() on initial rendering
    const notificationSettingsUpdated =
      prevNotificationSettings.current !== settings?.notifications
    if (notificationSettingsUpdated) {
      store()
      prevNotificationSettings.current = settings?.notifications
    }
  }, [settings?.notifications, store])

  useEffect(() => {
    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      setRefreshToken(token)
    })
  }, [])

  useEffect(() => {
    refreshToken && registerWithRefreshToken()
  }, [refreshToken, registerWithRefreshToken])

  return {store}
}
