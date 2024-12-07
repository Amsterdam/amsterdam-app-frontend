import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

const BOT_NAME = 'Chatbot Gemeente Amsterdam'

type Props = {
  isLast: boolean
  isLastOfRole: boolean
  message: ConversationEntry
}

const getChatAgentInfo = (
  displayName: string,
  agent: ConversationEntrySenderRole,
  timestamp: number,
) => {
  const formattedTimestamp = dayjsFromUnix(timestamp).format('HH:mm')

  if (agent === ConversationEntrySenderRole.user) {
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
  },
  isLastOfRole,
}: Props) => {
  const styles = useThemable(theme =>
    createStyles(theme, role === ConversationEntrySenderRole.user),
  )

  if (role === ConversationEntrySenderRole.system) {
    return null
  }

  return (
    !!isLastOfRole && (
      <>
        <Gutter height="xs" />
        <View style={styles.container}>
          <Phrase
            color="secondary"
            testID={`ChatHistoryGroupName${role}`}
            variant="extraSmall">
            {getChatAgentInfo(senderDisplayName, role, timestamp)}
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
