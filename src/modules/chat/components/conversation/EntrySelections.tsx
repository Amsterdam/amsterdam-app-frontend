import {ConversationEntrySelections} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'

type Props = {
  message: ConversationEntrySelections
}

export const EntrySelections = ({message}: Props) => (
  <ChatMessageEntry message={message}>
    <MessagePhrase
      message={message}
      testID="ChatEntrySelections">
      {message.selections?.map(selection => selection.title).join(', ')}
    </MessagePhrase>
  </ChatMessageEntry>
)
