import {useCallback, useContext, useEffect, useRef} from 'react'
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
  const settingsContext = useContext(SettingsContext)

  // TODO Set as environment variables in CI/CD pipeline
  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: '44755871-9ea6-4018-b1df-e4f00466c723',
  })

  const api = useFetch<DeviceRegistration>({
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

  const prevNotificationSettings = useRef<NotificationSettings | undefined>(
    settingsContext.notifications,
  )

  const onlySubscribedProjects = (projects: SubscribedProjects): string[] =>
    Object.entries(projects).reduce((acc, val) => {
      // @ts-ignore
      val[1] && acc.push(val[0])
      return acc
    }, [])

  const storeDeviceIfNeeded = useCallback(() => {
    const hasSubscribedProjects = onlySubscribedProjects(
      settingsContext?.notifications?.projects ?? {},
    ).length

    // if no projects are subscribed to, only store if previously there were
    if (!hasSubscribedProjects) {
      const prevSubscribedProjects = onlySubscribedProjects(
        prevNotificationSettings.current?.projects ?? {},
      ).length
      return prevSubscribedProjects
    }

    return true
  }, [settingsContext.notifications])

  // Store subscribed projects on the backend
  const store = useCallback(async () => {
    if (!storeDeviceIfNeeded()) {
      return
    }
    const projectsInSettings = settingsContext?.notifications?.projects
    try {
      const token = await getFcmToken()

      await api.fetchData(
        {},
        JSON.stringify({
          device_token: token,
          os_type: Platform.OS,
          projects: projectsInSettings
            ? onlySubscribedProjects(projectsInSettings)
            : [],
        }),
      )

      return api.hasError
    } catch (error) {
      console.log(error)
    }
  }, [settingsContext.notifications, storeDeviceIfNeeded]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // prevent calling store() on initial rendering
    const notificationSettingsUpdated =
      prevNotificationSettings.current !== settingsContext.notifications
    if (notificationSettingsUpdated) {
      store()
      prevNotificationSettings.current = settingsContext.notifications
    }
  }, [settingsContext.notifications, store])

  return {store}
}
