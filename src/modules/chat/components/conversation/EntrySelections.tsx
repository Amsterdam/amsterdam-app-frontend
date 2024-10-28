import {ConversationEntrySelections} from 'react-native-salesforce-messaging-in-app/src/types'
import {MessageBubble} from '@/modules/chat/components/MessageBubble'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'

type Props = {
  message: ConversationEntrySelections
}

export const EntrySelections = ({message}: Props) => (
  <MessageBubble message={message}>
    <MessagePhrase
      message={message}
      testID="Text">
      {message.selections?.map(selection => selection.title).join(', ')}
    </MessagePhrase>
  </MessageBubble>
)
