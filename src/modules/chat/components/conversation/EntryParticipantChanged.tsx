import {
  ConversationEntrySenderRole,
  ParticipantChangedOperationType,
  ConversationEntryParticipantChanged,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  isLastOfRole: boolean
  message: ConversationEntryParticipantChanged
}

export const EntryParticipantChanged = ({message, isLastOfRole}: Props) => {
  const joiningAgents = message.operations.find(
    operation =>
      operation.type === ParticipantChangedOperationType.add &&
      operation.participant.role === ConversationEntrySenderRole.agent,
  )

  const leavingAgents = message.operations.find(
    operation =>
      operation.type === ParticipantChangedOperationType.remove &&
      operation.participant.role === ConversationEntrySenderRole.agent,
  )

  if (!joiningAgents && !leavingAgents) {
    return null
  }

  const timestamp = dayjsFromUnix(message.timestamp).format('HH:mm')

  return (
    <>
      <ChatSystemEntry
        icon="person"
        testID={`ChatSystemMessage${message.format}`}
        text={
          joiningAgents
            ? `U chat nu met ${joiningAgents?.participant.displayName} - ${timestamp}`
            : `${leavingAgents?.participant.displayName} heeft het gesprek verlaten - ${timestamp}`
        }
      />
      <EntryGutter isLastOfRole={isLastOfRole} />
    </>
  )
}
