import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
  ConversationEntryRoutingWorkType,
  ParticipantChangedOperationType,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  message: ConversationEntry
}

const parseSystemMessage = (
  message: ConversationEntry,
): {icon: SvgIconName; text: string} | null => {
  if (message.format === ConversationEntryFormat.participantChanged) {
    const joiningEmployees = message.operations.filter(
      operation =>
        operation.type === ParticipantChangedOperationType.add &&
        operation.participant.role === ConversationEntrySenderRole.employee,
    )

    if (joiningEmployees.length > 0) {
      return {text: 'U chat nu met een medewerker', icon: 'person'}
    }
  } else if (
    message.format === ConversationEntryFormat.routingWorkResult &&
    message.workType === ConversationEntryRoutingWorkType.closed
  ) {
    return {
      text: `Chat gestopt om ${dayjs(message?.timestamp).format('HH:mm')}`,
      icon: 'chat',
    }
  }

  return null
}

export const ChatSystemMessage = ({message}: Props) => {
  const result = parseSystemMessage(message)

  if (!result) {
    return null
  }

  const {text, icon} = result

  return (
    <>
      <ChatInlineMessage
        icon={icon}
        testID={`ChatSystemMessage${message.format}`}
        text={text}
      />
      <Gutter height={'md'} />
    </>
  )
}
