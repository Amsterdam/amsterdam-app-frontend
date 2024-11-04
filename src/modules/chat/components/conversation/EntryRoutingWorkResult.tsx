import {useContext} from 'react'
import {
  ConversationEntryRoutingWorkType,
  ConversationEntryRoutingWorkResult,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {dayjs, dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  isLast: boolean
  isLastOfRole: boolean
  message: ConversationEntryRoutingWorkResult
}

export const EntryRoutingWorkResult = ({
  message,
  isLast,
  isLastOfRole,
}: Props) => {
  const {isWaitingForAgent} = useContext(ChatContext)

  if (
    message.workType !== ConversationEntryRoutingWorkType.closed ||
    isWaitingForAgent ||
    !isLast
  ) {
    return null
  }

  return (
    <>
      <ChatInlineMessage
        icon="chat"
        testID="ChatEntryRoutingWorkResult"
        text={`Chat gestopt om ${dayjsFromUnix(message?.timestamp ?? dayjs().unix()).format('HH:mm')}`}
      />
      <EntryGutter isLastOfRole={isLastOfRole} />
    </>
  )
}
