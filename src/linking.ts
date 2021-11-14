import messaging from '@react-native-firebase/messaging'
import {Linking} from 'react-native'
import {routes} from '../App'

const appPrefix = 'amsterdam://'

type PushNotificationTypes = {
  [type: string]: {
    id: string
    route: string
  }
}

const pushNotificationTypes: PushNotificationTypes = {
  NewsUpdatedByProjectManager: {
    id: 'NewsUpdatedByProjectManager',
    route: `${appPrefix}news`,
  },
  WarningCreatedByProjectManager: {
    id: 'WarningCreatedByProjectManager',
    route: `${appPrefix}warning`,
  },
}

export const linking = {
  prefixes: [appPrefix],
  config: {
    screens: {
      [routes.projectNews.name]: 'news/:id',
    },
  },
  async getInitialURL() {
    try {
      const url = await Linking.getInitialURL()

      if (url != null) {
        return url
      }

      const initialNotification = await messaging().getInitialNotification()
      if (initialNotification?.data?.type) {
        const notificationType =
          pushNotificationTypes[initialNotification?.data?.type]
        if (notificationType?.route) {
          const urlFromNotification = initialNotification.data.linkSourceid
            ? `${notificationType.route}/${initialNotification.data.linkSourceid}`
            : notificationType.route
          return urlFromNotification
        }
      }
      return null
    } catch (error) {
      console.log(error)
    }
  },
}
