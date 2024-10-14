import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {dayjs, dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  firstMessage: ConversationEntry
}

export const ChatStartTime = ({firstMessage}: Props) => (
  <ChatInlineMessage
    icon="chat"
    testID="ChatStartingTime"
    text={`Chat gestart om ${dayjsFromUnix(firstMessage?.timestamp ?? dayjs().unix()).format('HH:mm')}`}
  />
)
