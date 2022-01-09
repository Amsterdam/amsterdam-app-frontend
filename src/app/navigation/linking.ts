import notifee from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import {Linking} from 'react-native'
import {PushNotificationData} from '../../types'
import {menuRoutes} from './routes/menuRoutes'
import {tabRoutes} from './routes/tabRoutes'

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
      [tabRoutes.menu.name]: {
        screens: {
          [menuRoutes.projectNews.name]: 'news/:id',
          [menuRoutes.projectManager.name]: 'project-manager/:id',
          [menuRoutes.projectWarning.name]: 'warning/:id',
        },
      },
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
    const subscription = Linking.addEventListener('url', onReceiveURL)

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
    // will be listened for in the useForegroundPushNotificationHandler hook which handles
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
      subscription.remove()
      unsubscribeFg()
    }
  },
}
