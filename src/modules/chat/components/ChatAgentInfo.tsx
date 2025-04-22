import {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
  ConversationEntryStatus,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

const BOT_NAME = 'Chatbot Gemeente Amsterdam'

type Props = {
  isLast: boolean
  isLastOfGroup: boolean
  message: ConversationEntry
}

const getMessageStatus = (status: ConversationEntryStatus) => {
  switch (status) {
    case ConversationEntryStatus.sent:
      return 'Verzonden'
    case ConversationEntryStatus.delivered:
      return 'Bezorgd'
    case ConversationEntryStatus.read:
      return 'Gelezen'
    case ConversationEntryStatus.error:
      return 'Mislukt'
    case ConversationEntryStatus.sending:
      return 'Wordt verzonden...'
    default:
      return 'Onbekend'
  }
}

const getChatAgentInfo = (
  displayName: string,
  agent: ConversationEntrySenderRole,
  timestamp: number,
  status: ConversationEntryStatus,
  agentInChat: boolean,
) => {
  const formattedTimestamp = dayjsFromUnix(timestamp).format('HH:mm')

  if (agent === ConversationEntrySenderRole.user) {
    if (agentInChat) {
      return `${formattedTimestamp} - ${getMessageStatus(status)}`
    }

    return formattedTimestamp
  }

  if (agent === ConversationEntrySenderRole.chatbot) {
    return `${BOT_NAME} - ${formattedTimestamp}`
  }

  return `${displayName} - ${formattedTimestamp}`
}

export const ChatAgentInfo = ({
  message: {
    sender: {role},
    senderDisplayName,
    timestamp,
    status,
  },
  isLastOfGroup,
}: Props) => {
  const styles = useThemable(theme =>
    createStyles(theme, role === ConversationEntrySenderRole.user),
  )

  const {agentInChat} = useContext(ChatContext)

  if (role === ConversationEntrySenderRole.system) {
    return null
  }

  return (
    !!isLastOfGroup && (
      <>
        <Gutter height="xs" />
        <View style={styles.container}>
          <Phrase
            color="secondary"
            testID={`ChatHistoryGroupName${role}Phrase`}
            variant="extraSmall">
            {getChatAgentInfo(
              senderDisplayName,
              role,
              timestamp,
              status,
              agentInChat,
            )}
          </Phrase>
        </View>
      </>
    )
  )
}

const AVATAR_DIMENSION = 40
const createStyles = ({size}: Theme, isUser: boolean) =>
  StyleSheet.create({
    container: {
      paddingLeft: isUser ? undefined : AVATAR_DIMENSION + size.spacing.sm,
      alignItems: isUser ? 'flex-end' : 'flex-start',
    },
  })
