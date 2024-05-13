import notifee from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import {useMemo} from 'react'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'

/** display a notification when the app is in foreground-state
 * will be listened for in the useForegroundPushNotificationHandler hook which handles
 * the navigation.
 **/
export const useDisplayNotificationOnAppForeground = () => {
  const {trackCustomEvent} = usePiwik()

  useMemo(() => {
    messaging().onMessage(async message => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      })

      if (message.notification) {
        void notifee
          .displayNotification({
            title: message.notification.title,
            body: message.notification.body,
            android: {
              channelId: channelId,
            },
            data: message.data,
          })
          .then(() => {
            trackCustomEvent(
              'push-notification',
              PiwikAction.pushNotificationDisplay,
              {
                [PiwikDimension.pushTitle]: message.notification?.title,
                [PiwikDimension.pushContent]: message.notification?.body,
              },
            )
          })
      }
    })
  }, [trackCustomEvent])
}
