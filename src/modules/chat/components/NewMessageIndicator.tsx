import {useContext} from 'react'
import {Badge} from '@/components/ui/feedback/Badge'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

export const NewMessageIndicator = () => {
  const {newMessagesCount} = useContext(ChatContext)

  return newMessagesCount ? (
    <Badge
      accessibilityLabel="Twee nieuwe berichten"
      testID="ChatNewMessageIndicatorBadge"
      value={newMessagesCount}
      variant="small"
    />
  ) : null
}
