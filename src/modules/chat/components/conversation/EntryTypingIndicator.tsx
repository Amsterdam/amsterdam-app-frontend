import {ConversationEntryTypingStartedIndicator} from 'react-native-salesforce-messaging-in-app/src/types'
import {Box} from '@/components/ui/containers/Box'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {MessageBubble} from '@/modules/chat/components/MessageBubble'

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
  <MessageBubble message={message}>
    <Box insetVertical="xs">
      <LoadingDots
        dotActiveSize={dotActiveSize}
        dotInactiveSize={dotInactiveSize}
      />
    </Box>
  </MessageBubble>
)
