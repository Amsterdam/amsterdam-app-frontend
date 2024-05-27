import notifee, {EventType} from '@notifee/react-native'
import {useLinkTo} from '@react-navigation/native'
import {useEffect} from 'react'
import {createPathFromNotification} from '@/app/navigation/linking'
import {useDisplayNotificationOnAppForeground} from '@/hooks/useDisplayNotificationOnAppForeground'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {PushNotification} from '@/types/notification'

// Listen for foreground push-notification with Notifee and navigate to a path derived from
// its data-object, which is picked up by the linking configuration (linking.ts)
// to route to a screen
export const useForegroundPushNotificationHandler = () => {
  const linkTo = useLinkTo()
  const {trackCustomEvent} = usePiwik()

  useDisplayNotificationOnAppForeground()

  useEffect(() => {
    const navigateToUrlFromNotification = (notification?: PushNotification) => {
      if (!notification?.data) {
        return
      }

      const url = createPathFromNotification(notification)

      if (!url) {
        return
      }

      linkTo(url)
    }

    return notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        navigateToUrlFromNotification(detail.notification)
        trackCustomEvent('push-notification', PiwikAction.pushNotificationTap, {
          [PiwikDimension.pushTitle]: detail.notification?.title,
          [PiwikDimension.pushContent]: detail.notification?.body,
        })
      }
    })
  }, [linkTo, trackCustomEvent])
}
