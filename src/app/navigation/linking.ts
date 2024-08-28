import notifee, {EventType} from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import {getStateFromPath, LinkingOptions} from '@react-navigation/native'
import {Linking} from 'react-native'
import {RootStackParams} from '@/app/navigation/types'
import {ModuleSlug} from '@/modules/slugs'
import {moduleLinkings} from '@/modules/utils/moduleLinkings'
import {devLog} from '@/processes/development'
import {
  PushNotification,
  PushNotificationRouteConfig,
  PushNotificationType,
} from '@/types/notification'

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
  title = '',
  body = '',
}: PushNotification): string | undefined => {
  const notificationType = data?.type && pushNotificationTypes[data.type]

  if (!notificationType?.routeWithPrefix || !data?.linkSourceid) {
    return
  }

  const analyticsTitle = encodeURIComponent(`${title} - ${body}`)

  return `${notificationType.routeWithPrefix}/${data.linkSourceid}/${encodeURIComponent(title)}/${analyticsTitle}/true`
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

      const initialFirebaseNotification =
        await messaging().getInitialNotification()

      const routeWithPrefix =
        initialFirebaseNotification?.data &&
        initialFirebaseNotification.notification &&
        createPathFromNotification({
          data: initialFirebaseNotification.data,
          title: initialFirebaseNotification.notification.title,
          body: initialFirebaseNotification.notification.body,
        })

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

      if (
        routes?.length === 1 &&
        (routes[0].name as ModuleSlug) !== homeRouteName
      ) {
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

      const routeWithPrefix = createPathFromNotification({
        data: message.data,
        title: message.notification?.title,
        body: message.notification?.body,
      })

      if (!routeWithPrefix) {
        return
      }

      listener(routeWithPrefix)
    }

    // navigate from push when app is in background-state
    messaging().onNotificationOpenedApp(onMessageReceived)

    const navigateToUrlFromNotification = (notification?: PushNotification) => {
      if (!notification?.data) {
        return
      }

      const url = createPathFromNotification(notification)

      if (!url) {
        return
      }

      listener(url)
    }

    const removeListener = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        navigateToUrlFromNotification(detail.notification)
        // trackCustomEvent('push-notification', PiwikAction.pushNotificationTap, {
        //   [PiwikDimension.pushTitle]: detail.notification?.title,
        //   [PiwikDimension.pushContent]: detail.notification?.body,
        // })
      }
    })

    return () => {
      subscription.remove()
      removeListener()
    }
  },
}
