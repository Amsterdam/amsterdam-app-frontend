import notifee from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import {Linking} from 'react-native'
import {routes} from '../App'
import {PushNotificationData} from './types'

const appPrefix = 'amsterdam://'

type PushNotificationTypes = {
  [type: string]: {
    id: string
    route: string
    routeWithPrefix: string
  }
}

export const pushNotificationTypes: PushNotificationTypes = {
  NewsUpdatedByProjectManager: {
    id: 'NewsUpdatedByProjectManager',
    route: '/news',
    routeWithPrefix: `${appPrefix}news`,
  },
  WarningCreatedByProjectManager: {
    id: 'WarningCreatedByProjectManager',
    route: '/warning',
    routeWithPrefix: `${appPrefix}warning`,
  },
}

const createRoutWithPrefixFromDataObject = (dataObj: PushNotificationData) => {
  const notificationType = dataObj.type && pushNotificationTypes[dataObj.type]
  if (!notificationType) {
    return
  }
  if (notificationType?.routeWithPrefix) {
    const urlFromNotification = dataObj.linkSourceid
      ? `${notificationType.routeWithPrefix}/${dataObj.linkSourceid}`
      : notificationType.routeWithPrefix
    return urlFromNotification
  }
}

export const linking = {
  prefixes: [appPrefix],
  config: {
    screens: {
      [routes.projectNews.name]: 'news/:id',
      [routes.projectWarning.name]: 'warning/:id',
      [routes.projectManager.name]: 'project-manager/:id',
    },
  },
  async getInitialURL() {
    try {
      const url = await Linking.getInitialURL()

      if (url != null) {
        return url
      }

      const initialNotification = await messaging().getInitialNotification()
      const routeWithPrefix =
        initialNotification?.data &&
        createRoutWithPrefixFromDataObject(initialNotification.data)
      return routeWithPrefix ?? null
    } catch (error) {
      console.log(error)
    }
  },

  subscribe(listener: (deeplink: string) => void) {
    // First, you may want to do the default deep link handling
    const onReceiveURL = ({url}: {url: string}) => listener(url)

    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL)

    const onMessageReceived = async (
      message: FirebaseMessagingTypes.RemoteMessage,
    ) => {
      const routeWithPrefix =
        message?.data && createRoutWithPrefixFromDataObject(message.data)
      routeWithPrefix && listener(routeWithPrefix)
    }

    // navigate from push when app is in background-state
    messaging().onNotificationOpenedApp(onMessageReceived)

    // display a notification when the app is in foreground-state
    // will be listened for in the useNotifee hook which handles
    // the navigation
    const unsubscribeFg = messaging().onMessage(async message => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      })
      if (message.notification) {
        notifee.displayNotification({
          title: message.notification.title,
          body: message.notification.body,
          android: {
            channelId: channelId,
          },
          data: message.data,
        })
      }
    })

    return () => {
      Linking.removeEventListener('url', onReceiveURL)
      unsubscribeFg()
    }
  },
}
