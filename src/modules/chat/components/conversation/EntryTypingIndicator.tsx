import {ConversationEntryTypingStartedIndicator} from 'react-native-salesforce-messaging-in-app/src/types'
import {Box} from '@/components/ui/containers/Box'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'

type Props = {
  dotActiveSize?: number
  dotInactiveSize?: number
  message: ConversationEntryTypingStartedIndicator
}

export const EntryTypingIndicator = ({
  dotActiveSize,
  dotInactiveSize,
  message,
}: Props) => (
  <ChatMessageEntry message={message}>
    <Box insetVertical="xs">
      <LoadingDots
        dotActiveSize={dotActiveSize}
        dotInactiveSize={dotInactiveSize}
      />
    </Box>
  </ChatMessageEntry>
)
