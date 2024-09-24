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

export const ChatAgentName = ({
  message: {agent, timestamp},
  isLastOfType,
}: Props) => {
  const styles = useThemable(createStyles)

  return !!isLastOfType && agent !== ChatMessageAgent.user ? (
    <>
      <Gutter height="xs" />
      <View style={styles.container}>
        <Phrase
          color="secondary"
          testID={`ChatHistoryGroupName${agent}`}
          variant="extraSmall">
          {`${agent === ChatMessageAgent.bot ? BOT_NAME : EMPLOYEE_NAME} - ${dayjs(timestamp).format('HH:mm')}`}
        </Phrase>
      </View>
    </>
  ) : null
}

const AVATAR_DIMENSION = 40
const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    container: {
      paddingLeft: AVATAR_DIMENSION + size.spacing.sm,
    },
  })
