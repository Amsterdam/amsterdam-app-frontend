import {ConversationEntryText} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'

type Props = {
  message: ConversationEntryText
}

export const EntryText = ({message}: Props) => (
  <ChatMessageEntry message={message}>
    <MessagePhrase
      message={message}
      testID="Text">
      {message.text}
    </MessagePhrase>
  </ChatMessageEntry>
)
