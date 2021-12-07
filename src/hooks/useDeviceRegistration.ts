import {useContext} from 'react'
import {Platform} from 'react-native'
import {getEnvironment} from '../environment'
import {SettingsContext} from '../providers/settings.provider'
import {DeviceRegistration, SubscribedProjects} from '../types'
import {encryptWithAES, getFcmToken} from '../utils'
import {useFetch} from './useFetch'

export const useDeviceRegistration = () => {
  const settingsContext = useContext(SettingsContext)
  // TODO Set as environment variables in CI/CD pipeline
  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: '44755871-9ea6-4018-b1df-e4f00466c723',
  })

  // Configure endpoint
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

  // The backend isn’t interested in projects that the user has unsubscribed to
  // but the front-end lists them until the user removes them explicitly
  // so for the device registration we remove unsubscribed projects.
  // TODO Add unit tests
  const onlySubscribedProjects = (projects: SubscribedProjects): string[] =>
    Object.entries(projects).reduce((acc, val) => {
      // @ts-ignore
      val[1] && acc.push(val[0])
      return acc
    }, [])

  const store = async () => {
    try {
      if (
        !settingsContext.notifications ||
        !settingsContext.notifications.projectsEnabled ||
        !Object.keys(settingsContext.notifications.projects).length
      ) {
        throw 'No projects for this device to register'
      }
      const token = await getFcmToken()

      await api.fetchData(
        {},
        JSON.stringify({
          device_token: token,
          os_type: Platform.OS,
          projects: onlySubscribedProjects(
            settingsContext.notifications.projects,
          ),
        }),
      )

      return api.hasError
    } catch (error) {
      console.log(error)
    }
  }

  return {store}
}
