import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {dayjs, dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  firstMessage?: ConversationEntry
}

export const ChatStartTime = ({firstMessage}: Props) => (
  <ChatSystemEntry
    icon="chat"
    testID="ChatStartingTime"
    text={`Chat gestart - ${dayjsFromUnix(firstMessage?.timestamp ?? dayjs().unix()).format('HH:mm')}`}
  />
)
