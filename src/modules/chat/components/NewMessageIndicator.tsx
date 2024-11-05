import {useContext} from 'react'
import {Badge} from '@/components/ui/feedback/Badge'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

export const NewMessageIndicator = () => {
  const {newMessagesCount} = useContext(ChatContext)

  return newMessagesCount ? (
    <Badge
      testID="ChatNewMessageIndicatorBadge"
      value={newMessagesCount}
    />
  ) : null
}
