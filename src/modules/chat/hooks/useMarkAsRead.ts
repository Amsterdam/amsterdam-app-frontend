import {useEffect} from 'react'
import {markAsRead} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {useChat} from '@/modules/chat/slice'

export const useMarkAsRead = (messages: ConversationEntry[]) => {
  const {isMaximized} = useChat()

  useEffect(() => {
    if (isMaximized && messages.length > 0) {
      const externalMessages = messages.filter(
        message => message.sender.role !== ConversationEntrySenderRole.user,
      )

      void markAsRead(externalMessages[externalMessages.length - 1])
    }
  }, [messages, messages.length, isMaximized])
}
