import {
  ConversationEntrySenderRole,
  ConversationEntryText,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'

type Props = {
  message: ConversationEntryText
}

export const EntryText = ({message}: Props) => {
  const isUser = message.sender.role === ConversationEntrySenderRole.user

  return (
    <ChatMessageEntry message={message}>
      <MessagePhrase
        accessibilityLabel={
          isUser
            ? `Uw bericht: ${message.text}`
            : `${message.text} ontvangen van ${message.senderDisplayName}`
        }
        message={message}
        testID="ChatEntryText">
        {message.text}
      </MessagePhrase>
    </ChatMessageEntry>
  )
}
