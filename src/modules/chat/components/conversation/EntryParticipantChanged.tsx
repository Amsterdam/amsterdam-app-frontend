import {
  ConversationEntrySenderRole,
  ParticipantChangedOperationType,
  ConversationEntryParticipantChanged,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'

type Props = {
  isLastOfRole: boolean
  message: ConversationEntryParticipantChanged
}

export const EntryParticipantChanged = ({message, isLastOfRole}: Props) => {
  const joiningEmployees = message.operations.some(
    operation =>
      operation.type === ParticipantChangedOperationType.add &&
      operation.participant.role === ConversationEntrySenderRole.employee,
  )

  if (!joiningEmployees) {
    return null
  }

  return (
    <>
      <ChatInlineMessage
        icon="person"
        testID={`ChatSystemMessage${message.format}`}
        text="U chat nu met een medewerker"
      />
      <EntryGutter isLastOfRole={isLastOfRole} />
    </>
  )
}