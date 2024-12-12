import {
  ConversationEntrySenderRole,
  ParticipantChangedOperationType,
  ConversationEntryParticipantChanged,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'

type Props = {
  isLastOfRole: boolean
  message: ConversationEntryParticipantChanged
}

const hasDisplayname = (displayName: string | undefined) =>
  !!displayName && displayName !== 'User'

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

  const displayName = joiningAgents
    ? joiningAgents.participant.displayName
    : leavingAgents?.participant.displayName

  return (
    <>
      <ChatSystemEntry
        icon="person"
        testID={`ChatSystemMessage${message.format}`}
        text={
          joiningAgents
            ? `U chat nu met ${hasDisplayname(displayName) ? displayName : 'een medewerker'}`
            : `${hasDisplayname(displayName) ? displayName : 'Medewerker'} heeft het gesprek verlaten`
        }
        timestamp={message.timestamp}
      />
      <EntryGutter isLastOfRole={isLastOfRole} />
    </>
  )
}
