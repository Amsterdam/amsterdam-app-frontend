import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import {getStateFromPath, LinkingOptions} from '@react-navigation/native'
import {Linking} from 'react-native'
import {RootStackParams} from '@/app/navigation/types'
import {ModuleSlug} from '@/modules/slugs'
import {devLog} from '@/processes/development'
import {
  PushNotification,
  PushNotificationRouteConfig,
  PushNotificationType,
} from '@/types/notification'
import {moduleLinkings} from '@/utils/moduleLinkings'

const appPrefix = 'amsterdam://'

export const pushNotificationTypes: Record<
  PushNotificationType,
  PushNotificationRouteConfig
> = {
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

export const createPathFromNotification = ({
  data,
  notification,
}: PushNotification) => {
  const notificationType = data?.type && pushNotificationTypes[data.type]

  if (!notificationType?.routeWithPrefix || !data?.linkSourceid) {
    return
  }

  const baseRoute = `${notificationType.routeWithPrefix}/${data.linkSourceid}`

  if (!notification?.title) {
    return baseRoute
  }

  const baseRouteWithTitle = `${baseRoute}/${notification.title}`

  if (!notification.body) {
    return baseRouteWithTitle
  }

  return `${baseRouteWithTitle}/${notification.title} - ${notification.body}`
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

      const initialNotification =
        (await messaging().getInitialNotification()) as PushNotification
      const routeWithPrefix =
        initialNotification?.data &&
        createPathFromNotification(initialNotification)

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
      if (!message.data) {
        return
      }

      const routeWithPrefix = createPathFromNotification(
        message as PushNotification,
      )

      if (!routeWithPrefix) {
        return
      }

      listener(routeWithPrefix)
    }

    // navigate from push when app is in background-state
    messaging().onNotificationOpenedApp(onMessageReceived)

    return () => {
      subscription.remove()
    }
  },
}
