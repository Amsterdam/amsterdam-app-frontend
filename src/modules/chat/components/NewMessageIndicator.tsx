import simplur from 'simplur'
import {Badge} from '@/components/ui/feedback/Badge'
import {useChatContext} from '@/modules/chat/providers/chat.context'

export const NewMessageIndicator = () => {
  const {newMessagesCount} = useChatContext()

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
