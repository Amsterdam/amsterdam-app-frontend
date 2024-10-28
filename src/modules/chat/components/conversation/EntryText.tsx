import {ConversationEntryText} from 'react-native-salesforce-messaging-in-app/src/types'
import {MessageBubble} from '@/modules/chat/components/MessageBubble'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'

type Props = {
  message: ConversationEntryText
}

export const EntryText = ({message}: Props) => (
  <MessageBubble message={message}>
    <MessagePhrase
      message={message}
      testID="Text">
      {message.text}
    </MessagePhrase>
  </MessageBubble>
)
