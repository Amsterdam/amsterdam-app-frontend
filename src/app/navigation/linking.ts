import notifee from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import {getStateFromPath, LinkingOptions} from '@react-navigation/native'
import {Linking} from 'react-native'
import {RootStackParams} from '@/app/navigation/types'
import {ModuleSlug} from '@/modules/slugs'
import {devLog} from '@/processes/development'
import {PushNotificationData} from '@/types/notification'
import {moduleLinkings} from '@/utils/moduleLinkings'

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
  ProjectWarningCreatedByProjectManager: {
    id: 'ProjectWarningCreatedByProjectManager',
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
    return dataObj.linkSourceid
      ? `${notificationType.routeWithPrefix}/${dataObj.linkSourceid}`
      : notificationType.routeWithPrefix
  }
}

export const linking: LinkingOptions<RootStackParams> = {
  prefixes: [appPrefix],
  config: {
    screens: moduleLinkings,
  },
  getInitialURL: async () => {
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
      devLog(error)
    }
  },
  getStateFromPath: (path, config) => {
    const state = getStateFromPath(path, config)

    if (state) {
      const {routes} = state
      const homeRouteName = ModuleSlug.home

      if (routes?.length === 1 && routes[0].name !== homeRouteName) {
        state.routes.unshift({name: homeRouteName})
      }
    }

    return state
  },
  subscribe: (listener: (deeplink: string) => void) => {
    // First, you may want to do the default deep link handling
    const onReceiveURL = ({url}: {url: string}) => listener(url)

    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', onReceiveURL)

    const onMessageReceived = (
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
        void notifee.displayNotification({
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
