import {View, StyleSheet} from 'react-native'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ChatMessage, ChatMessageAgent} from '@/modules/chat/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {dayjs} from '@/utils/datetime/dayjs'

const BOT_NAME = 'Chatbot Gemeente Amsterdam'
const EMPLOYEE_NAME = 'Jasmijn' // Get from real data once implemented

type Props = {
  isLastOfType: boolean
  message: ChatMessage
}

const getChatAgentName = (agent: ChatMessageAgent, timestamp: number) => {
  const formattedTimestamp = dayjs(timestamp).format('HH:mm')

  if (agent === ChatMessageAgent.user) {
    return formattedTimestamp
  }

  if (agent === ChatMessageAgent.bot) {
    return `${BOT_NAME} - ${formattedTimestamp}`
  }

  return `${EMPLOYEE_NAME} - ${formattedTimestamp}`
}

export const ChatAgentName = ({
  message: {agent, timestamp},
  isLastOfType,
}: Props) => {
  const styles = useThemable(theme =>
    createStyles(theme, agent === ChatMessageAgent.user),
  )

  return (
    !!isLastOfType && (
      <>
        <Gutter height="xs" />
        <View style={styles.container}>
          <Phrase
            color="secondary"
            testID={`ChatHistoryGroupName${agent}`}
            variant="extraSmall">
            {getChatAgentName(agent, timestamp)}
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
