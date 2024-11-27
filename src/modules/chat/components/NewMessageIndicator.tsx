import {useContext} from 'react'
import simplur from 'simplur'
import {Badge} from '@/components/ui/feedback/Badge'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

export const NewMessageIndicator = () => {
  const {newMessagesCount} = useContext(ChatContext)

  return newMessagesCount ? (
    <Badge
      accessibilityLabel={
        newMessagesCount +
        ' ' +
        simplur`[nieuw bericht|nieuwe berichten]${[newMessagesCount]} `
      }
      testID="ChatNewMessageIndicatorBadge"
      value={newMessagesCount}
      variant="small"
    />
  ) : null
}
