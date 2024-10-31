import {useContext} from 'react'
import {
  ConversationEntryRoutingWorkType,
  ConversationEntryRoutingWorkResult,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {dayjs, dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  isLast: boolean
  message: ConversationEntryRoutingWorkResult
}

export const EntryRoutingWorkResult = ({message, isLast}: Props) => {
  const {waitingForAgent} = useContext(ChatContext)

  if (
    message.workType !== ConversationEntryRoutingWorkType.closed ||
    waitingForAgent ||
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
    </>
  )
}
