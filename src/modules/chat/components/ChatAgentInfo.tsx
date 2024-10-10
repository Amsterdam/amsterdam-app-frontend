import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {dayjs} from '@/utils/datetime/dayjs'

const BOT_NAME = 'Chatbot Gemeente Amsterdam'
const EMPLOYEE_NAME = 'Jasmijn' // Get from real data once implemented

type Props = {
  isLastOfType: boolean
  message: ConversationEntry
}

const getChatAgentInfo = (
  agent: ConversationEntrySenderRole,
  timestamp: number,
) => {
  const formattedTimestamp = dayjs(timestamp).format('HH:mm')

  if (agent === ConversationEntrySenderRole.user) {
    return formattedTimestamp
  }

  if (agent === ConversationEntrySenderRole.chatbot) {
    return `${BOT_NAME} - ${formattedTimestamp}`
  }

  return `${EMPLOYEE_NAME} - ${formattedTimestamp}`
}

export const ChatAgentInfo = ({
  message: {
    sender: {role},
    timestamp,
  },
  isLastOfType,
}: Props) => {
  const styles = useThemable(theme =>
    createStyles(theme, role === ConversationEntrySenderRole.user),
  )

  if (role === ConversationEntrySenderRole.system) {
    return null
  }

  return (
    !!isLastOfType && (
      <>
        <Gutter height="xs" />
        <View style={styles.container}>
          <Phrase
            color="secondary"
            testID={`ChatHistoryGroupName${role}`}
            variant="extraSmall">
            {getChatAgentInfo(role, timestamp)}
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
