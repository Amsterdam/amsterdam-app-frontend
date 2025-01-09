import notifee from '@notifee/react-native'
import {Platform} from 'react-native'
import {useAppLifecycle} from 'react-native-applifecycle'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {useAsync} from '@/hooks/useAsync'
import {isNewMessage} from '@/modules/chat/utils/isNewMessage'
import {ModuleSlug} from '@/modules/slugs'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {PiwikAction} from '@/processes/piwik/types'

export const useSendNotificationWhenInBackground = (
  messages: ConversationEntry[],
) => {
  const appState = useAppLifecycle()

  const {trackCustomEvent} = useTrackEvents()

  useAsync(async () => {
    // notify users of new messages in the chat, when the app is in background/inactive
    // for iOS 'background' is disabled, because that would only show when the app becomes active again
    if (
      appState !== 'active' &&
      !(Platform.OS === 'ios' && appState === 'background') &&
      isNewMessage(messages[messages.length - 1]?.format)
    ) {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      })

      void notifee
        .displayNotification({
          title: messages[messages.length - 1].senderDisplayName,
          body: messages[messages.length - 1].text,
          android: {
            channelId,
            pressAction: {id: 'default'},
          },
          data: {
            maximizeChat: 1,
            module: ModuleSlug.chat,
          },
        })
        .then(() => {
          trackCustomEvent(
            'chat-push-notification',
            PiwikAction.pushNotificationDisplay,
            {},
          )
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])
}
