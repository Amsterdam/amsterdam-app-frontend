import notifee, {EventType} from '@notifee/react-native'
import {useLinkTo} from '@react-navigation/native'
import {useCallback, useEffect} from 'react'
import {pushNotificationTypes} from '../linking'
import {PushNotification, PushNotificationData} from '../types'

// Listen for foreground pushnotification with Notifee and navigate to a path derived from
// its data-object, which is picked up by the linking configuration (linking.ts)
// to route to a screen
export const useNotifee = () => {
  const linkTo = useLinkTo()

  const createUrlFromDataObject = (dataObj: PushNotificationData) => {
    const notificationType = dataObj.type && pushNotificationTypes[dataObj.type]
    if (!notificationType) {
      return
    }
    if (notificationType?.route) {
      const urlFromNotification = dataObj.linkSourceid
        ? `${notificationType.route}/${dataObj.linkSourceid}`
        : notificationType.route
      return urlFromNotification
    }
  }

  const onPressNotification = useCallback(
    (notification: PushNotification | undefined) => {
      if (!notification?.data) {
        return
      }
      const url = createUrlFromDataObject(notification.data)
      url && linkTo(url)
    },
    [linkTo],
  )

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          onPressNotification(detail.notification)
          break
      }
    })
  }, [onPressNotification])
}
