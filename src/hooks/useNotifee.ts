import notifee, {EventType} from '@notifee/react-native'
import {useLinkTo} from '@react-navigation/native'
import {useEffect} from 'react'
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

  const onPressNotification = (notification: PushNotification | undefined) => {
    if (!notification) {
      return
    }
    const url = notification.data && createUrlFromDataObject(notification.data)
    url && linkTo(url)
  }

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      console.log('render')
      switch (type) {
        case EventType.PRESS:
          onPressNotification(detail.notification)
          console.log('User pressed notification', detail.notification)
          break
      }
    })
    unsubscribe()

    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
