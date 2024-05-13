import notifee, {EventType} from '@notifee/react-native'
import {useLinkTo} from '@react-navigation/native'
import {useEffect} from 'react'
import {pushNotificationTypes} from '@/app/navigation/linking'
import {useDisplayNotificationOnAppForeground} from '@/hooks/useDisplayNotificationOnAppForeground'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {PushNotification, PushNotificationData} from '@/types/notification'

const createUrlFromDataObject = (
  dataObj: PushNotificationData,
): string | undefined => {
  const notificationType = dataObj.type && pushNotificationTypes[dataObj.type]

  if (!notificationType) {
    return undefined
  }

  if (notificationType?.route) {
    return dataObj.linkSourceid
      ? `${notificationType.route}/${dataObj.linkSourceid}`
      : notificationType.route
  }
}

// Listen for foreground push-notification with Notifee and navigate to a path derived from
// its data-object, which is picked up by the linking configuration (linking.ts)
// to route to a screen
export const useForegroundPushNotificationHandler = () => {
  const linkTo = useLinkTo()
  const {trackCustomEvent} = usePiwik()

  useDisplayNotificationOnAppForeground()

  useEffect(() => {
    const navigateToUrlFromNotification = (
      notification: PushNotification | undefined,
    ) => {
      if (!notification?.data) {
        return
      }

      const url = createUrlFromDataObject(notification.data)

      url && linkTo(url)
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
