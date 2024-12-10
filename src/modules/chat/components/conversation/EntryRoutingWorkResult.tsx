import {useContext} from 'react'
import {
  ConversationEntryRoutingWorkType,
  ConversationEntryRoutingWorkResult,
  ConversationEntryFormat,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  isLast: boolean
  isLastOfRole: boolean
  message: ConversationEntryRoutingWorkResult
}

export const EntryRoutingWorkResult = ({message, isLastOfRole}: Props) => {
  const {messages, isEnded} = useContext(ChatContext)

  if (
    message.workType !== ConversationEntryRoutingWorkType.closed ||
    !isEnded ||
    messages
      .filter(m => m.format === ConversationEntryFormat.routingWorkResult)
      .slice(-1)[0].entryId !== message.entryId
  ) {
    return null
  }

  return (
    <>
      <ChatSystemEntry
        icon="chat"
        testID="ChatEntryRoutingWorkResult"
        text={`Chat gestopt - ${dayjsFromUnix(message.timestamp).format('HH:mm')}`}
      />
      <EntryGutter isLastOfRole={isLastOfRole} />
    </>
  )
}
