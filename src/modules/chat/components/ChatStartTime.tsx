import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  firstMessage: ConversationEntry
}

export const ChatStartTime = ({firstMessage}: Props) => (
  <ChatInlineMessage
    icon="chat"
    testID="ChatStartingTime"
    text={`Chat gestart om ${dayjs(firstMessage?.timestamp).format('HH:mm')}`}
  />
)
