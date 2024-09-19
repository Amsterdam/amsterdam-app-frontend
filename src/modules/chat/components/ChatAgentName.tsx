import {View, StyleSheet} from 'react-native'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ChatMessageAgent} from '@/modules/chat/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const BOT_NAME = 'Chatbot Gemeente Amsterdam'
const EMPLOYEE_NAME = 'Jasmijn' // Get from real data once implemented

type Props = {
  agent: ChatMessageAgent
  isLastOfType: boolean
}

export const ChatAgentName = ({agent, isLastOfType}: Props) => {
  const styles = useThemable(createStyles)

  return !!isLastOfType && agent !== ChatMessageAgent.user ? (
    <>
      <Gutter height="xs" />
      <View style={styles.container}>
        <Phrase
          color="secondary"
          testID={`ChatHistoryGroupName${agent}`}
          variant="extra-small">
          {agent === ChatMessageAgent.bot ? BOT_NAME : EMPLOYEE_NAME}
        </Phrase>
      </View>
    </>
  ) : null
}

const createStyles = ({size}: Theme) => {
  const avatarDimension = 40

  return StyleSheet.create({
    container: {
      paddingLeft: avatarDimension + size.spacing.sm,
    },
  })
}
