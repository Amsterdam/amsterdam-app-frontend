import {EventType} from '@notifee/react-native'
import {allModules} from '@/modules/modules'
import {ModuleClientConfig} from '@/modules/types'
import {store} from '@/store/store'
import {type PushNotification} from '@/types/notification'

export const createPathFromNotification = (
  notification: PushNotification,
  isPushNotificationDeeplink = true,
): string | undefined | void =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (allModules as ModuleClientConfig<any>[])
    .find(module => module.slug === notification?.data?.module_slug)
    ?.onNotificationEvent?.(
      EventType.PRESS,
      {
        notification,
      },
      isPushNotificationDeeplink,
      store.dispatch,
    )
