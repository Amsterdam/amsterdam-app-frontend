import notifee, {EventType} from '@notifee/react-native'
import {
  FirebaseMessagingTypes,
  getMessaging,
} from '@react-native-firebase/messaging'
import {getStateFromPath, LinkingOptions} from '@react-navigation/native'
import {Linking} from 'react-native'
import type {RootStackParams} from '@/app/navigation/types'
import type {
  PushNotification,
  PushNotificationDataDefault,
} from '@/types/notification'
import {appPrefix} from '@/app/navigation/constants'
import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {navigationRef} from '@/app/navigation/navigationRef'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {clientModules} from '@/modules/modules'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {moduleLinkings} from '@/modules/utils/moduleLinkings'
import {devLog} from '@/processes/development'
import {type RootState} from '@/store/types/rootState'

export const createLinking = (
  dispatch: ReduxDispatch,
  getState: () => RootState,
): LinkingOptions<RootStackParams> => ({
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

      const initialNotifeeNotification = await notifee.getInitialNotification()

      const notifeeRoute =
        initialNotifeeNotification?.notification.data &&
        initialNotifeeNotification.notification &&
        createPathFromNotification({
          data: initialNotifeeNotification.notification.data,
          title: initialNotifeeNotification.notification.title,
          body: initialNotifeeNotification.notification.body,
        })

      if (notifeeRoute) {
        return appPrefix + notifeeRoute.slice(1)
      }

      const initialFirebaseNotification =
        await getMessaging().getInitialNotification()

      const route =
        initialFirebaseNotification?.data &&
        initialFirebaseNotification.notification &&
        createPathFromNotification({
          data: initialFirebaseNotification.data,
          title: initialFirebaseNotification.notification.title,
          body: initialFirebaseNotification.notification.body,
        })

      return route ? appPrefix + route.slice(1) : null
    } catch (error) {
      devLog(error)
    }
  },
  getStateFromPath: (path, config) => {
    let state: ReturnType<typeof getStateFromPath>
    const match = /module\/(.*)/.exec(path)

    if (match?.[1]) {
      const moduleName = match[1] as ModuleSlug

      state = {routes: [{name: moduleName, params: undefined}]}
    } else {
      state = getStateFromPath(path, config)
    }

    if (state && !navigationRef.isReady()) {
      const {routes} = state
      const homeRouteName = ModuleSlug.home

      if (
        routes?.length === 1 &&
        (routes[0].name as ModuleSlug) !== homeRouteName
      ) {
        state.routes.unshift({name: homeRouteName, params: undefined})
      }
    }

    if (state) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clientModules.forEach((module: ModuleClientConfig<any>) => {
        if (typeof module.postProcessLinking === 'function') {
          const result = module.postProcessLinking(state, dispatch, getState)

          if (result) {
            Object.assign(state, result)
          }
        }
      })
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

      const route = createPathFromNotification({
        data: message.data as PushNotificationDataDefault,
        title: message.notification?.title,
        body: message.notification?.body,
      })

      if (!route) {
        return
      }

      listener(appPrefix + route.slice(1))
    }

    // navigate from push when app is in background-state
    getMessaging().onNotificationOpenedApp(onMessageReceived)

    const navigateToUrlFromNotification = (notification?: PushNotification) => {
      if (!notification?.data) {
        return
      }

      const route = createPathFromNotification(notification)

      if (!route) {
        return
      }

      listener(appPrefix + route.slice(1))
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
})
